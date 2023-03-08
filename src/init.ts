import { getAccessTokenCache } from '@src/routers/load';
import { AxiosProxyConfig } from 'axios';

export const init = async (proxy?: AxiosProxyConfig) => {
    let count = 0;
    let result = await getAccessTokenCache(proxy);
    while (result.refresh_token.length === 0 && count < 5) {
        console.log('登录失败，马上进行重复登录');
        count++
        result = await getAccessTokenCache(proxy);
    }

    if (result.access_token.length === 0 || result.refresh_token.length === 0) {
        throw new Error("本次登录过多，请重新运行程序进行登录。")
    }
    
    return result;
};

