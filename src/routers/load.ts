import { Token } from '@src/request/token';
import { AxiosProxyConfig } from 'axios';

type Cache = {
    access_token: string;
    refresh_token: string;
};

export const getAccessTokenCache = async (proxy: AxiosProxyConfig) => {
    const result: Cache = {
        access_token: '',
        refresh_token: '',
    };

    const res = await Token.refresh(proxy);
    result.access_token = res.access_token;
    result.refresh_token = res.refresh_token;

    return result;
};
