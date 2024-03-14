import axios, {AxiosProxyConfig, AxiosResponse, AxiosPromise} from 'axios'
import { PixivConst, STATUS_CODE } from '@src/const'

export const setProxy = (proxy?: AxiosProxyConfig) => {
    if (proxy) {
        axios.defaults.proxy = {
            ...proxy
        }  
    }
}

// axios.defaults.proxy = {
//     host: "127.0.0.1",
//     port: 7890
// }

// 如何更改AxiosReponse的返回类型
axios.interceptors.response.use((res) => {
    return {
        status: STATUS_CODE.SUCCESS,
        data: res.data,
        err: null
    };
}, (err) => {
    console.error(err);
    return {
        status: STATUS_CODE.FAILED,
        data: null,
        err
    }
})



export namespace PixivAxios {
    export const GeneralHeaders = {
        'User-Agent': PixivConst.Request.USER_AGENT,
        'Content-Type': PixivConst.Request.CONTENT_TYPE,
    }

    export const WebHeaders = {
        'Content-Type': "text/html; charset=UTF-8",
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    }

    export const pAxios = axios;

    export const CLIENT_INFO = {
        ...PixivConst.Token
    }

    export namespace APIV1 {
        export const URL = 'https://app-api.pixiv.net/v1'
    }

    export namespace LOGIN {
        export const URL = 'https://app-api.pixiv.net/web/v1/login'
    }

    export namespace AUTH_TOKEN {
        export const URL = 'https://oauth.secure.pixiv.net/auth/token';
    }

    export namespace WEB_URL {
        export const URL = "https://www.pixiv.net"
    }

    export type PAxiosResponse = AxiosResponse
    export type PAxiosPromise = AxiosPromise
}