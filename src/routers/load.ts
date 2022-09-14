import { Middleware } from '@koa/router';
import { Token } from '@src/request/token';
import fs from 'fs';
import path from 'path';

type Cache = {
    access_token: string;
    refresh_token: string;
    time_stamp: number;
};

export const getAccessTokenCache = async () => {
    console.log('执行了Cache')
    const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, './access.json'), 'utf-8')) as unknown as Cache;
    const now = new Date().getTime();
    let result: Cache = {
        access_token: cache.access_token || '',
        refresh_token: cache.refresh_token || '',
        time_stamp: cache.time_stamp || 0
    }

    // RefreshToken为空的情况
    if (result.refresh_token.length === 0) {
        const res = await Token.refresh()
        result.access_token = res.access_token
        result.refresh_token = res.refresh_token
        result.time_stamp = new Date().getTime() + 1000 * 3600
        fs.writeFileSync(
            path.resolve(__dirname, './access.json'),
            JSON.stringify(result)
        );
    // AccessToken过期的情况
    } else if (cache.time_stamp > now || cache.access_token.length === 0) {
        result.access_token = await Token.access(result.refresh_token)
        result.time_stamp = new Date().getTime() + 1000 * 3600
        fs.writeFileSync(
            path.resolve(__dirname, './access.json'),
            JSON.stringify(result)
        )
    }

    return result
}

export const LoadConfig: Middleware = async (ctx, next) => {
    // 为挂载ctx做准备
    ctx.token = {};
    const token = await getAccessTokenCache();

    // cache
    if (token.access_token.length !== 0) {
        ctx.token.access_token = token.access_token
        ctx.token.refresh_token = token.refresh_token
        return next()
    } else  {
        ctx.status = 400;
        ctx.body = {
            status: false,
            info: '请求AccessToken/RefreshToken出错，请检查账号设置或代理',
            data: null,
        };
    } 
};
