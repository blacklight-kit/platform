import { WebToken } from '../types/webtoken.js';
export default class profileController {
    private createClient;
    getCurrentProfile(token: WebToken): Promise<{
        data: {
            profileUsers?: Array<{
                id: string;
                settings?: Array<{
                    id?: string;
                    value?: string;
                }>;
            }>;
        };
    }>;
    getFriendsList(token: WebToken): Promise<unknown>;
    getPlayedGames(token: WebToken, limit?: number, achievementLimit?: number): Promise<{
        xuid: string;
        profile: {
            gamertag: string | null;
            gamerscore: string | null;
            avatarUrl: string | null;
            displayName: string | null;
        };
        games: import("../lib/profile-played-games.js").PlayedGameSummary[];
        recentAchievements: import("../lib/profile-recent-achievements.js").RecentAchievementSummary[];
    }>;
    private fetchRecentAchievements;
    private fetchMinutesPlayedForTitles;
}
//# sourceMappingURL=profile.d.ts.map