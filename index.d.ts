interface AxiosProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  protocol?: string;
}

declare enum RankingMode {
    DAY = "day",
    WEEK = "week",
    MONTH = "month"
}
declare type UserIllustsType = 'manga' | 'illust';
declare type WebPixivType = {
    illusts: Array<{
        id: string;
        image_urls: {
            large: string;
            medium: string;
            square_medium: string;
        };
        title: string;
        user: {
            id: string;
            name: string;
        };
        meta_single_page: {
            original_image_url: string;
        };
    }>;
    next_url: string;
};
declare type PixivPic = {
    title: string;
    id: string;
    url: string;
    author: string;
};

declare type DecortorParamsFn = (token: string, ...params: any[]) => Promise<any>;

declare class RPixiv {
    static TIMESTAMP: number;
    private accessToken;
    private refreshToken;
    private startTime;
    private proxy_config;
    constructor(proxy?: AxiosProxyConfig);
    axiosInit(): void;
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
    setStartTime(time: number): void;
    checkTime(): Promise<void>;
    init(): Promise<void>;
    decoratorForData(fn: DecortorParamsFn, ...params: any): Promise<any>;
    getDayRanks(range: string): Promise<any>;
    getWeekRanks(range: string): Promise<any>;
    getMonthRanks(range: string): Promise<any>;
    searchIllusts(keywords: string): Promise<any>;
    getAuthorIllusts(id: string, iType?: UserIllustsType): Promise<any>;
    getAuthorInfo(id: string): Promise<any>;
}

export { DecortorParamsFn, PixivPic, RPixiv, RankingMode, UserIllustsType, WebPixivType };
