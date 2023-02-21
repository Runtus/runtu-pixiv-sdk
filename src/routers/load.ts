import { Token } from '@src/request/token';
import fs from 'fs';
import { AxiosProxyConfig } from 'axios'
import path from 'path';

type Cache = {
    access_token: string;
    refresh_token: string;
};

export const getAccessTokenCache = async (proxy: AxiosProxyConfig) => {
    if (!fs.existsSync(path.resolve(__dirname, './access.json'))) {
        fs.writeFileSync(path.resolve(__dirname, './access.json'), JSON.stringify({}))
    }
    const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, './access.json'), 'utf-8')) as unknown as Cache;
    const result: Cache = {
        access_token: cache.access_token || '',
        refresh_token: cache.refresh_token || '',
    }


    // access.json为空
    if (result.refresh_token.length === 0) {
        const res = await Token.refresh(proxy)
        result.access_token = res.access_token
        result.refresh_token = res.refresh_token
        fs.writeFileSync(
            path.resolve(__dirname, './access.json'),
            JSON.stringify(result)
        );
    // AccessToken过期的情况，即超时
    } else {
        const access = await Token.access(result.refresh_token)
        if (access.data && access.data.access_token) {
            result.access_token = access.data.access_token
        }

        fs.writeFileSync(
            path.resolve(__dirname, './access.json'),
            JSON.stringify(result)
        )
    }
    console.log('result', result)

    return result
}
