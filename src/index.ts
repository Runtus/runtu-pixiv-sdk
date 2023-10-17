import { PixivRequestSpace } from '@src/routers/index';
import { init } from './init';
import { AxiosProxyConfig, AxiosRequestConfig } from 'axios';
import { setProxy as setApiProxy } from '@src/request/axios.pixiv.api';
import { getAccessTokenCache } from '@src/routers/load';
import { DecortorParamsFn, UserIllustsType, RPixivData, AuthorIllusts, AuthorInfo, PixivResponse, WebPixivType } from './type'
import * as dotenv from 'dotenv'

dotenv.config()

export class RPixiv {
    static TIMESTAMP = 60 * 1000 * 15; // 令牌15分钟有效

    private accessToken: string ;
    private refreshToken: string;
    private startTime: number;

    private proxy_config: AxiosProxyConfig;

    constructor(proxy?: AxiosProxyConfig) {
        this.proxy_config = proxy;
        this.axiosProxyInit();
    }

    private axiosProxyInit() {
        setApiProxy(this.proxy_config);
    }

    private setAccessToken(token: string) {
        this.accessToken = token;
    }

    private setRefreshToken(token: string) {
        this.refreshToken = token;
    }

    private setStartTime(time: number) {
        this.startTime = time;
    }



    private async checkTime() {
        const now = new Date().getTime();
        // 保证accesstoken有效以及时间没过期
        if (now - this.startTime >= RPixiv.TIMESTAMP || !this.accessToken) {
            const result = await getAccessTokenCache(this.proxy_config, this.refreshToken);
            this.setAccessToken(result.access_token);
            this.setStartTime(now);
        }
    }

    public async token() {
        if (process.env.REFRESH_TOKEN) {
            this.setRefreshToken(process.env.REFRESH_TOKEN)
        } else {
            const response = await init();
            this.setAccessToken(response.data.access_token);
            this.setRefreshToken(response.data.refresh_token)
        }
        this.setStartTime(new Date().getTime());
    }

    // 装饰器
    private async decoratorForData<T>(fn: DecortorParamsFn<T>, ...params: any) {
        await this.checkTime();
        return fn(this.accessToken, ...params)
    }

    // TODO 后续看有无最佳实践用范性来替代类型断言
    async getDayRanks(range: string) {
        return await this.decoratorForData(PixivRequestSpace.getDayRanks, range)
    }

    async getWeekRanks(range: string) {
        return await this.decoratorForData(PixivRequestSpace.getWeekRanks, range)
    }

    async getMonthRanks(range: string) {
        return await this.decoratorForData(PixivRequestSpace.getMonthRanks, range)
    }

    async searchIllusts(keywords: string) {
        return await this.decoratorForData(PixivRequestSpace.searchIllusts, keywords)
    }

    async searchIllustsById(id: string) {
        return await this.decoratorForData(PixivRequestSpace.searchIllustsById, id)
    }

    async getAuthorIllusts(id: string, iType ?: UserIllustsType) {
        return await this.decoratorForData(PixivRequestSpace.getAuthorIllusts, id, iType)
    }

    async getAuthorInfo(id: string) {
        return await this.decoratorForData(PixivRequestSpace.getAuthorInfo, id)
    }

    async getPixivStream(url: string, rType?: AxiosRequestConfig['responseType']) {
        return await PixivRequestSpace.getPixivUrlData(url, rType)
    }


}


export * from './type'