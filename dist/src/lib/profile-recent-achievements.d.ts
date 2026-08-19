export type AchievementTitleSummary = {
    titleId: number | string;
    name: string;
    lastUnlock?: string | Date | null;
    earnedAchievements?: number;
};
export type AchievementEntry = {
    id: string;
    name: string;
    description?: string;
    progressState?: string;
    isSecret?: boolean;
    progression?: {
        timeUnlocked?: string | Date | null;
    };
    mediaAssets?: Array<{
        type?: string;
        url?: string;
    }>;
    rewards?: Array<{
        type?: string;
        value?: string;
    }>;
    titleAssociations?: Array<{
        name?: string;
        id?: number;
    }>;
};
export type RecentAchievementSummary = {
    id: string;
    name: string;
    description: string;
    gamerscore: number;
    unlockedAt: string;
    iconUrl: string | null;
    titleId: string;
    titleName: string;
};
export declare function parseUnlockTime(value: string | Date | null | undefined): number;
export declare function pickAchievementIcon(achievement: AchievementEntry): string | null;
export declare function pickAchievementGamerscore(achievement: AchievementEntry): number;
export declare function sortAchievementTitlesByLastUnlock(titles: AchievementTitleSummary[]): AchievementTitleSummary[];
export declare function toRecentAchievementSummary(achievement: AchievementEntry, titleName: string, titleId: string): RecentAchievementSummary | null;
export declare function mergeRecentAchievements(entries: RecentAchievementSummary[], limit?: number): RecentAchievementSummary[];
export declare function getTitlesToScanForAchievements(titles: AchievementTitleSummary[], limit?: number): AchievementTitleSummary[];
//# sourceMappingURL=profile-recent-achievements.d.ts.map