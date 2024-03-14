import { AxiosRequestConfig } from 'axios';
import { PixivAxios } from '../axios.pixiv.api'
import { Header as headers } from '../header';
import qs from 'qs';
import { PixivResponse, PixivToken } from '../type';

// pixiv内置参数
const URL = 'https://oauth.secure.pixiv.net/auth/token';

export const getAccessToken: (refreshToken: string) => PixivResponse<PixivToken> = (refreshToken) => {
    const body = qs.stringify({
        client_id: PixivAxios.CLIENT_INFO.CLIENT_ID,
        client_secret: PixivAxios.CLIENT_INFO.CLIENT_SECRET,
        grant_type: 'refresh_token',
        hash_secret: PixivAxios.CLIENT_INFO.HASH_SECRET,
        get_secure_url: 1,
        include_policy: true,
        refresh_token: refreshToken,
    });
    const options: AxiosRequestConfig = {
        method: 'POST',
        url: URL,
        headers,
        data: body,
    };

    return PixivAxios.pAxios(options)
};
