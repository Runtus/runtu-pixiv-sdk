import axios, { AxiosProxyConfig, AxiosRequestConfig } from 'axios';
import { Header as headers } from '../header';
import { PixivConst } from '@src/const';
import qs from 'qs';

// pixiv内置参数
const URL = 'https://oauth.secure.pixiv.net/auth/token';

export const getAccessToken = (refreshToken: string, proxy?: AxiosProxyConfig) => {
    const body = qs.stringify({
        client_id: PixivConst.Token.CLIENT_ID,
        client_secret: PixivConst.Token.CLIENT_SECRET,
        grant_type: 'refresh_token',
        hash_secret: PixivConst.Token.HASH_SECRET,
        get_secure_url: 1,
        include_policy: true,
        refresh_token: refreshToken,
    });
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: URL,
        headers,
        data: body,
        proxy
    };
    return axios(options).catch(err => ({
        info: err,
        data: null
    }))
};
