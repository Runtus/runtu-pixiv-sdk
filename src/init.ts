import { getAccessTokenCache } from '@src/routers/load';
import { AxiosProxyConfig } from 'axios';


export const init = async (proxy?: AxiosProxyConfig) => {
    let result = await getAccessTokenCache(proxy);
    while (result.refresh_token.length === 0) {
        console.log('登录失败，马上进行重复登录');
        result = await getAccessTokenCache(proxy);
    }

    console.log('init 114514');
    return result;
};

