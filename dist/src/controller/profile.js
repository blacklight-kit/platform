import XboxApiClient from 'xbox-webapi';
import { TRPCError } from '@trpc/server';
import { getTitlesToScanForAchievements, mergeRecentAchievements, toRecentAchievementSummary } from '../lib/profile-recent-achievements.js';
import { chunkTitleIds, extractProfileSettings, parseUserstatsResponse, sortTitlesByLastPlayed, toPlayedGameSummary } from '../lib/profile-played-games.js';
export default class profileController {
    createClient(token) {
        if (token.uhs === '' || token.token === '') {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: '(WebApi) No token or uhs provided'
            });
        }
        return new XboxApiClient
            .default({
            uhs: token.uhs,
            token: token.token
        });
    }
    async getCurrentProfile(token) {
        return await this.createClient(token).providers.profile.getCurrentUser();
    }
    async getFriendsList(token) {
        return await this.createClient(token).providers.people.getFriends();
    }
    async getPlayedGames(token, limit = 40, achievementLimit = 24) {
        const client = this.createClient(token);
        const profileResponse = await client.providers.profile.getCurrentUser();
        const profileUser = profileResponse.data.profileUsers?.[0];
        if (!profileUser?.id) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Unable to resolve Xbox profile'
            });
        }
        const xuid = profileUser.id;
        const profile = extractProfileSettings(profileUser.settings);
        const historyResponse = await client.providers.titlehub.getTitleHistory(xuid);
        const sorted = sortTitlesByLastPlayed(historyResponse.data.titles ?? []).slice(0, limit);
        const [minutesByTitle, recentAchievements] = await Promise.all([
            this.fetchMinutesPlayedForTitles(client, xuid, sorted.map((title) => title.titleId)),
            this.fetchRecentAchievements(client, xuid, achievementLimit)
        ]);
        return {
            xuid,
            profile,
            games: sorted.map((title) => toPlayedGameSummary(title, minutesByTitle.get(title.titleId) ?? null)),
            recentAchievements
        };
    }
    async fetchRecentAchievements(client, xuid, limit) {
        try {
            const historyResponse = await client.providers.achievements.getAchievements(xuid, undefined, 100);
            const titlesToScan = getTitlesToScanForAchievements(historyResponse.data.titles ?? []);
            const collected = [];
            for (const chunk of chunkTitleIds(titlesToScan.map((title) => String(title.titleId)), 3)) {
                const results = await Promise.allSettled(chunk.map(async (titleId) => {
                    const title = titlesToScan.find((entry) => String(entry.titleId) === titleId);
                    const response = await client.providers.achievements.getTitleId(xuid, titleId, undefined, 200);
                    return (response.data.achievements ?? [])
                        .map((achievement) => toRecentAchievementSummary(achievement, title?.name || titleId, titleId))
                        .filter((entry) => entry !== null);
                }));
                for (const result of results) {
                    if (result.status !== 'fulfilled')
                        continue;
                    collected.push(...result.value);
                }
            }
            return mergeRecentAchievements(collected.filter((entry) => entry !== null), limit);
        }
        catch {
            return [];
        }
    }
    async fetchMinutesPlayedForTitles(client, xuid, titleIds) {
        const minutesByTitle = new Map();
        for (const chunk of chunkTitleIds(titleIds, 5)) {
            const results = await Promise.allSettled(chunk.map(async (titleId) => {
                const response = await client.providers.userstats.getUserTitleStats(xuid, titleId);
                return parseUserstatsResponse(response.data);
            }));
            for (const result of results) {
                if (result.status !== 'fulfilled')
                    continue;
                for (const [titleId, minutes] of result.value) {
                    minutesByTitle.set(titleId, minutes);
                }
            }
        }
        return minutesByTitle;
    }
}
