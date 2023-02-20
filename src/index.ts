
import { PixivRequestSpace } from '@src/routers/index';
import { Init } from './init'
import { AxiosProxyConfig } from 'axios'
import { setProxy } from '@src/request/axios.pixiv.api'
import { getAccessTokenCache } from '@src/routers/load'


export class RPixiv {
    static TIMESTAMP = 60 * 1000 * 15 // 令牌15分钟有效

    private accessToken: string
    private refreshToken: string
    private startTime: number

    private proxy_config: AxiosProxyConfig


    
    constructor(proxy ?: AxiosProxyConfig) {
        Init.tokenCache(proxy).then(res => {
            this.accessToken = res.access_token
            this.refreshToken = res.refresh_token
            this.startTime = new Date().getTime()
        })
        this.proxy_config = proxy
        this.axiosInit()
       
    }

    axiosInit() {
        setProxy(this.proxy_config)
    }

    setAccessToken(token: string) {
        this.accessToken = token
    }

    setStartTime(time: number) {
        this.startTime = time
    }

    async checkTime() {
        const now = new Date().getTime()
        if (now - this.startTime >= RPixiv.TIMESTAMP) {
            const result = await getAccessTokenCache(this.proxy_config)
            this.setAccessToken(result.access_token)
            this.setStartTime(now)
        }
    }

    async getDayRanks(range: string) { 
        await this.checkTime()
        return PixivRequestSpace.getDayRanks(this.accessToken, range)
    }

    async getWeekRanks(range: string) {
        await this.checkTime()
        return PixivRequestSpace.getWeekRanks(this.accessToken, range)
    }

    async getMonthRanks(range: string) {
        await this.checkTime()
        return PixivRequestSpace.getMonthRanks(this.accessToken, range)
    }

    


}


const obj = new RPixiv({
    host: "127.0.0.1",
    port: 7890
})