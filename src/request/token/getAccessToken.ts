// @ts-ignore
import request from 'request';
import { Header as headers } from '../header';
import { PixivConst } from '@src/const';
import { getProxy } from '../proxy';
import { config } from '@src/config.pixiv'
import qs from 'qs';

// pixiv内置参数
const BASE_URL = 'https://oauth.secure.pixiv.net/auth/token';
const FAIL_CALLBACK_INFO = '';

let R: any
if (config.proxy.status) {
    R = request.defaults({ proxy: getProxy() })
} else {
    R = request
}

export const getAccessToken = (refreshToken: string) =>
    new Promise<string>((resolve, reject) => {
        const body = qs.stringify({
            client_id: PixivConst.Token.CLIENT_ID,
            client_secret: PixivConst.Token.CLIENT_SECRET,
            grant_type: 'refresh_token',
            hash_secret: PixivConst.Token.HASH_SECRET,
            get_secure_url: 1,
            include_policy: true,
            refresh_token: refreshToken,
        });  
        const options = {
            method: 'post',
            url: BASE_URL,
            headers,
            body,
        };
        R(options, (err: any, res: any) => {
            if (err) {
                console.log('获取AccessToken失败，请检查网络或RefreshToken')
                reject(FAIL_CALLBACK_INFO);
            } else {
                try {
                    const body = JSON.parse(res.body);
                    resolve(body.access_token as string);
                } catch (err) {
                    console.error(err);
                    reject(FAIL_CALLBACK_INFO);
                }
            }
        });
    });
