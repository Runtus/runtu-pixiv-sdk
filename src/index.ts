import { PixivRequestSpace } from '@src/components/index';
import { AxiosProxyConfig, AxiosRequestConfig } from 'axios';
import { setProxy as setApiProxy } from '@src/request/axios.pixiv.api';
import { initRefreshToken, refreshAccessToken } from '@src/components/token';
import { DecortorParamsFn, UserIllustsType } from './type';
import * as dotenv from 'dotenv';

dotenv.config();

export class RPixiv {
    static TIMESTAMP = 60 * 1000 * 15; // 令牌15分钟刷新一次

    private accessToken: string;
    private refreshToken: string;
    private startTime: number;

    private proxy_config: AxiosProxyConfig;

    constructor(proxy?: AxiosProxyConfig) {
        const that = this;
        this.proxy_config = proxy;
        this.axiosProxyInit();
        // token初始化
        this.tokenInit().then(result => {
            that.setAccessToken(result.access_token);
            that.setRefreshToken(result.refresh_token);
            that.setStartTime(result.startTime);
        });
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
            const access_token = await refreshAccessToken(this.refreshToken);
            this.setAccessToken(access_token);
            this.setStartTime(now);
        }
    }

    private async tokenInit() {
        const now = new Date().getTime();
        let access_token = '',
            refresh_token = '';
        if (process.env.REFRESH_TOKEN) {
            refresh_token = process.env.REFRESH_TOKEN;
        } else {
            const tokenResponse = await initRefreshToken();
            if (tokenResponse.err) {
                console.error("runtu-pixiv-SDK: 获取refreshToken失败，请检查网络问题，即将结束程序");
                // refreshToken获取失败，强制结束程序
                process.exit(1);
            }
            access_token = tokenResponse.access_token;
            refresh_token = tokenResponse.refresh_token;
        }

        return {
            access_token,
            refresh_token,
            startTime: now,
        };
    }

    // 装饰器
    private async decoratorForData<T>(fn: DecortorParamsFn<T>, ...params: any) {
        // 拦截器，若没有token没有请求成功，则放弃本次请求，并告知用户等待重新请求。
        if (!this.refreshToken) {
            console.log('refreshToken 还没获取，请等待token获取完毕');
        }
        await this.checkTime();
        return fn(this.accessToken, ...params);
    }

    // TODO 后续看有无最佳实践用范性来替代类型断言
    public async getDayRanks(range: string) {
        return await this.decoratorForData(PixivRequestSpace.getDayRanks, range);
    }

    public async getWeekRanks(range: string) {
        return await this.decoratorForData(PixivRequestSpace.getWeekRanks, range);
    }

    public async getMonthRanks(range: string) {
        return await this.decoratorForData(PixivRequestSpace.getMonthRanks, range);
    }

    public async searchIllusts(keywords: string) {
        return await this.decoratorForData(PixivRequestSpace.searchIllusts, keywords);
    }

    public async searchIllustsById(id: string) {
        return await this.decoratorForData(PixivRequestSpace.searchIllustsById, id);
    }

    public async getAuthorIllusts(id: string, iType?: UserIllustsType) {
        return await this.decoratorForData(PixivRequestSpace.getAuthorIllusts, id, iType);
    }

    public async getAuthorInfo(id: string) {
        return await this.decoratorForData(PixivRequestSpace.getAuthorInfo, id);
    }

    public async getPixivStream(url: string, rType?: AxiosRequestConfig['responseType']) {
        return await PixivRequestSpace.getPixivUrlData(url, rType);
    }
}

export * from './type';
