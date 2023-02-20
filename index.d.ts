interface AxiosProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  protocol?: string;
}

declare class RPixiv {
    static TIMESTAMP: number;
    private accessToken;
    private refreshToken;
    private startTime;
    private proxy_config;
    constructor(proxy?: AxiosProxyConfig);
    axiosInit(): void;
    setAccessToken(token: string): void;
    setStartTime(time: number): void;
    checkTime(): Promise<void>;
    getDayRanks(range: string): Promise<{
        code: number;
        data: {
            date: string;
            illusts: {
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
            }[];
        };
        info: string;
    }>;
    getWeekRanks(range: string): Promise<{
        code: number;
        data: {
            date: string;
            illusts: {
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
            }[];
        };
        info: string;
    }>;
    getMonthRanks(range: string): Promise<{
        code: number;
        data: {
            date: string;
            illusts: {
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
            }[];
        };
        info: string;
    }>;
}

export { RPixiv };
