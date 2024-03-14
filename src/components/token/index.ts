// token相关的请求
import { Token } from '@src/request/token';

// 用于请求refreshToken
export const initRefreshToken = async () => {
    let count = 0;
    let result: {
        access_token?: string;
        refresh_token?: string;
        err?: string;
    } = {};

    try {
        let resultTemp = await Token.refresh();
        while (resultTemp.data.refresh_token.length === 0 && count < 5) {
            console.log('登录失败，即将进行重复登录');
            count++;
            resultTemp = await Token.refresh();
        }
        result = {
            err: resultTemp.err,
            ...resultTemp.data,
        };
    } catch (err) {
        console.error('runtu-pixiv-SDK: 获取RefreshToken失败, path: src/components/token/index.ts', err);
    } finally {
        return result;
    }
};


// 用于刷新AccessToken
export const refreshAccessToken = async (refreshToken: string) => {
    let access_token = "";
    try {
        const resultTemp = await Token.access(refreshToken);
        if (resultTemp.data.access_token.length === 0) {
            throw new Error("AccessToken请求失败，请检查refreshToken或网络是否正常");
        }
        access_token = resultTemp.data.access_token;
    } catch (err) {
        console.error('runtu-pixiv-SDK: 获取AccessToken失败, path: src/components/token/index.ts', err);
    } finally {
        return access_token;
    }
}
