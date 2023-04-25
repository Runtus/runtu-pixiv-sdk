import { PixivRequestSpace } from '@src/routers/index';
import { init } from './init';
import { AxiosProxyConfig, AxiosRequestConfig } from 'axios';
import { setProxy as setApiProxy } from '@src/request/axios.pixiv.api';
import { setProxy as setUrlProxy } from '@src/request/getPixivStream'
import { getAccessTokenCache } from '@src/routers/load';
import { DecortorParamsFn, UserIllustsType, RPixivData } from './type'
import * as dotenv from 'dotenv'

dotenv.config()


export class RPixiv {
    static TIMESTAMP = 60 * 1000 * 15; // 令牌15分钟有效

    public accessToken: string ;
    private refreshToken: string;
    private startTime: number;

    private proxy_config: AxiosProxyConfig;

    constructor(proxy?: AxiosProxyConfig) {
        this.proxy_config = proxy;
        this.axiosProxyInit();
    }

    axiosProxyInit() {
        setApiProxy(this.proxy_config);
        setUrlProxy(this.proxy_config);
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
        // 保证accesstoken有效以及时间没过期
        if (now - this.startTime >= RPixiv.TIMESTAMP || !this.accessToken) {
            const result = await getAccessTokenCache(this.proxy_config, this.refreshToken);
            this.setAccessToken(result.access_token);
            this.setStartTime(now);
        }
    }

    async token() {
        console.log(process.env.REFRESH_TOKEN)
        if (process.env.REFRESH_TOKEN) {
            this.setRefreshToken(process.env.REFRESH_TOKEN)
        } else {
            const response = await init(this.proxy_config);
            this.setAccessToken(response.access_token);
            this.setRefreshToken(response.refresh_token)
        }
        this.setStartTime(new Date().getTime());
    }

    // 装饰器
    async decoratorForData (fn: DecortorParamsFn, ...params: any) {
        await this.checkTime();
        return fn(this.accessToken, ...params)
    }

    // TODO 后续看有无最佳实践用范性来替代类型断言
    getDayRanks(range: string) {
        return this.decoratorForData(PixivRequestSpace.getDayRanks, range) as Promise<RPixivData>
    }

    getWeekRanks(range: string) {
        return this.decoratorForData(PixivRequestSpace.getWeekRanks, range) as Promise<RPixivData>
    }

    getMonthRanks(range: string) {
        return this.decoratorForData(PixivRequestSpace.getMonthRanks, range) as Promise<RPixivData>
    }

    searchIllusts(keywords: string) {
        return this.decoratorForData(PixivRequestSpace.searchIllusts, keywords) as Promise<RPixivData>
    }

    getAuthorIllusts(id: string, iType ?: UserIllustsType) {
        return this.decoratorForData(PixivRequestSpace.getAuthorIllusts, id, iType)
    }

    getAuthorInfo(id: string) {
        return this.decoratorForData(PixivRequestSpace.getAuthorInfo, id)
    }

    getPixivStream(url: string, rType?: AxiosRequestConfig['responseType']) {
        return PixivRequestSpace.getPixivUrlData(url, rType)
    }
}


export * from './type'