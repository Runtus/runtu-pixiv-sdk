import { PixivRequestSpace } from '@src/routers/index';
import { init } from './init';
import { AxiosProxyConfig } from 'axios';
import { setProxy } from '@src/request/axios.pixiv.api';
import { getAccessTokenCache } from '@src/routers/load';
import { DecortorParamsFn, UserIllustsType } from './type'

export class RPixiv {
    static TIMESTAMP = 60 * 1000 * 15; // 令牌15分钟有效

    private accessToken: string ;
    private refreshToken: string;
    private startTime: number;

    private proxy_config: AxiosProxyConfig;

    constructor(proxy?: AxiosProxyConfig) {
        this.proxy_config = proxy;
        this.axiosInit();
    }

    axiosInit() {
        setProxy(this.proxy_config);
    }

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    setRefreshToken(token: string) {
        this.refreshToken = token;
    }

    setStartTime(time: number) {
        this.startTime = time;
    }



    async checkTime() {
        const now = new Date().getTime();
        if (now - this.startTime >= RPixiv.TIMESTAMP) {
            const result = await getAccessTokenCache(this.proxy_config);
            this.setAccessToken(result.access_token);
            this.setStartTime(now);
        }
    }

    async init() {
        const response = await init(this.proxy_config);
        console.log(response.access_token)
        this.setAccessToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
        this.setStartTime(new Date().getTime());
    }

    // 装饰器
    async decoratorForData (fn: DecortorParamsFn, ...params: any) {
        if (!this.refreshToken) {
            await this.init();
        }
        await this.checkTime();
        return fn(this.accessToken, ...params)
    }

    getDayRanks(range: string) {
        return this.decoratorForData(PixivRequestSpace.getDayRanks, range);
    }

    getWeekRanks(range: string) {
        return this.decoratorForData(PixivRequestSpace.getWeekRanks, range);
    }

    getMonthRanks(range: string) {
        return this.decoratorForData(PixivRequestSpace.getMonthRanks, range);
    }

    searchIllusts(keywords: string) {
        return this.decoratorForData(PixivRequestSpace.searchIllusts, keywords)
    }

    getAuthorIllusts(id: string, iType ?: UserIllustsType) {
        return this.decoratorForData(PixivRequestSpace.getAuthorIllusts, id, iType)
    }

    getAuthorInfo(id: string) {
        return this.decoratorForData(PixivRequestSpace.getAuthorInfo, id)
    }
}


export * from './type'