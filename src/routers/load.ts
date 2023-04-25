import { Token } from '@src/request/token';
import { AxiosProxyConfig } from 'axios';


export const getAccessTokenCache = async (proxy: AxiosProxyConfig, refresh_token: string) => {
    const result = {
        access_token: '',
    };

    const res = await Token.access(refresh_token, proxy);
    result.access_token = res.data.access_token;

    return result;
};
