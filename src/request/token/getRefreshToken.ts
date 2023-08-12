import ctypto from 'crypto';
import base64 from 'base64url';
import crypto from 'crypto';
import qs from 'qs';
import readline from 'readline-sync';
import { PixivAxios } from '../axios.pixiv.api'
import { PixivToken, PixivResponse } from '../type'

const REDIRECT_URI = 'https://app-api.pixiv.net/web/v1/users/auth/pixiv/callback';

const tokenBase64: (size: number) => string = size => {
    return base64(ctypto.randomBytes(size));
};

type RefreshResponse = {
    access_token: string;
    refresh_token: string;
};

export const getRefreshToken: () => PixivResponse<PixivToken> = async () => {
    const code_verifier = tokenBase64(32);
    const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64').split('/').join('_').split('+').join('-').split('=').join('');
    const login_params = {
        code_challenge,
        code_challenge_method: 'S256',
        client: 'pixiv-android',
    };

    let token = '';
    try {
        token = qs.parse(
            readline
                .question(
                    `Please copy the below link to the brower and login using your account \n
            🌟 ${PixivAxios.LOGIN.URL}?${qs.stringify(login_params)} 🌟 \n
            Before you login, you should enter the F12 to open brower developer. \n
            After you login, you can see the string "pixiv://xxxxxx..." in the console, copy them and input here. \n
            copy the link and patse it here: `
                )
                .split('?')[1]
        ).code as string;
    } catch (err) {
        console.log("输入的url格式错误")
    }

    // Pixiv接口的post请求data要求为urlencoded模式
    const res = await PixivAxios.pAxios({
        url: PixivAxios.AUTH_TOKEN.URL,
        method: 'POST',
        data: qs.stringify({
            client_id: PixivAxios.CLIENT_INFO.CLIENT_ID,
            client_secret: PixivAxios.CLIENT_INFO.CLIENT_SECRET,
            code: token,
            code_verifier: code_verifier,
            grant_type: 'authorization_code',
            include_policy: 'true',
            redirect_uri: REDIRECT_URI,
        }),
        headers: {
            ...PixivAxios.GeneralHeaders
        },
    });

    return res;
};
