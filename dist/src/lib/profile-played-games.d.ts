export type TitleHistoryTitle = {
    titleId: string;
    name: string;
    type?: string;
    displayImage?: string | null;
    images?: Array<{
        url?: string;
        type?: string;
    }>;
    titleHistory?: {
        lastTimePlayed?: string | Date | null;
        visible?: boolean;
    };
    achievement?: {
        currentAchievements?: number;
        totalAchievements?: number;
        currentGamerscore?: number;
        totalGamerscore?: number;
        progressPercentage?: number;
    };
};
export type PlayedGameSummary = {
    titleId: string;
    name: string;
    imageUrl: string | null;
    lastPlayed: string | null;
    minutesPlayed: number | null;
    achievements: {
        current: number;
        total: number;
        gamerscore: number;
        maxGamerscore: number;
        progressPercentage: number;
    } | null;
};
export declare function parseLastPlayed(value: string | Date | null | undefined): number;
export declare function pickTitleImage(title: TitleHistoryTitle): string | null;
export declare function sortTitlesByLastPlayed(titles: TitleHistoryTitle[]): TitleHistoryTitle[];
export declare function toPlayedGameSummary(title: TitleHistoryTitle, minutesPlayed: number | null): PlayedGameSummary;
export declare function chunkTitleIds(titleIds: string[], chunkSize?: number): string[][];
type UserstatRecord = {
    titleid?: string;
    titleId?: string;
    name?: string;
    value?: string;
};
type UserstatsResponse = {
    statlistscollection?: UserstatRecord[];
    groups?: Array<{
        titleid?: string;
        titleId?: string;
        statlistscollection?: Array<{
            stats?: UserstatRecord[];
        }>;
    }>;
};
export declare function flattenUserstats(response: UserstatsResponse | undefined): UserstatRecord[];
export declare function parseMinutesPlayedStats(stats: Array<UserstatRecord> | undefined): Map<string, number>;
export declare function parseUserstatsResponse(response: UserstatsResponse | undefined): Map<string, number>;
export declare function getMinutesForTitle(minutesByTitle: Map<string, number>, titleId: string): number | null;
export declare function buildPlayedGamesResponse(titles: TitleHistoryTitle[], minutesByTitle: Map<string, number>, limit?: number): PlayedGameSummary[];
export declare function extractProfileSettings(settings: Array<{
    id?: string;
    value?: string;
}> | undefined): {
    gamertag: string | null;
    gamerscore: string | null;
    avatarUrl: string | null;
    displayName: string | null;
};
export {};
//# sourceMappingURL=profile-played-games.d.ts.map