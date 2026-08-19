const DEFAULT_TITLE_SCAN = 12;
const DEFAULT_ACHIEVEMENT_LIMIT = 24;
export function parseUnlockTime(value) {
    if (!value)
        return 0;
    const time = value instanceof Date ? value.getTime() : Date.parse(String(value));
    return Number.isFinite(time) ? time : 0;
}
export function pickAchievementIcon(achievement) {
    for (const asset of achievement.mediaAssets ?? []) {
        if (asset.type === 'Icon' && asset.url?.trim()) {
            return asset.url;
        }
    }
    for (const asset of achievement.mediaAssets ?? []) {
        if (asset.url?.trim()) {
            return asset.url;
        }
    }
    return null;
}
export function pickAchievementGamerscore(achievement) {
    for (const reward of achievement.rewards ?? []) {
        if (reward.type !== 'Gamerscore')
            continue;
        const value = Number.parseInt(String(reward.value ?? ''), 10);
        if (Number.isFinite(value) && value > 0) {
            return value;
        }
    }
    return 0;
}
export function sortAchievementTitlesByLastUnlock(titles) {
    return [...titles]
        .filter((title) => (title.earnedAchievements ?? 0) > 0)
        .filter((title) => parseUnlockTime(title.lastUnlock) > 0)
        .sort((a, b) => parseUnlockTime(b.lastUnlock) - parseUnlockTime(a.lastUnlock));
}
export function toRecentAchievementSummary(achievement, titleName, titleId) {
    if (achievement.progressState !== 'Achieved')
        return null;
    const unlockedAtMs = parseUnlockTime(achievement.progression?.timeUnlocked);
    if (unlockedAtMs <= 0)
        return null;
    return {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description?.trim() || achievement.name,
        gamerscore: pickAchievementGamerscore(achievement),
        unlockedAt: new Date(unlockedAtMs).toISOString(),
        iconUrl: pickAchievementIcon(achievement),
        titleId,
        titleName
    };
}
export function mergeRecentAchievements(entries, limit = DEFAULT_ACHIEVEMENT_LIMIT) {
    return [...entries]
        .sort((a, b) => parseUnlockTime(b.unlockedAt) - parseUnlockTime(a.unlockedAt))
        .slice(0, limit);
}
export function getTitlesToScanForAchievements(titles, limit = DEFAULT_TITLE_SCAN) {
    return sortAchievementTitlesByLastUnlock(titles).slice(0, limit);
}
