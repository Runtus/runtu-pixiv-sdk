import { Middleware } from '@koa/router';
import { getAccessToken, gerRefreshToken } from '@src/request/token/getToken';
import fs from 'fs';
import path from 'path';

type Cache = {
    access_token: string;
    time_stamp: number;
};

const getCache = () => {
    const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, './access.json'), 'utf-8')) as unknown as Cache;
    const now = new Date().getTime();
    if (now < cache.time_stamp) {
        return cache.access_token;
    } else {
        return '';
    }
};

export const LoadConfig: Middleware = async (ctx, next) => {
    // 为挂载ctx做准备
    ctx.token = {};
    const access_token_cache = getCache();
    let access_token = '';

    // cache
    if (access_token_cache) {
        access_token = access_token_cache;
    } else {
        access_token = await getAccessToken();
        // 1000 * 3600 是 pixiv规定的access_token的有效时间
        const time_stamp = new Date().getTime() + 1000 * 3600;
        fs.writeFileSync(
            path.resolve(__dirname, './access.json'),
            JSON.stringify({
                time_stamp,
                access_token,
            })
        );
    }

    if (access_token.length === 0) {
        ctx.status = 400;
        ctx.body = {
            status: false,
            info: '请求AccessToken出错，请检查账号设置或代理',
            data: null,
        };
    } else {
        ctx.token.access_token = access_token;
        ctx.token.refresh_token = gerRefreshToken();

        return next();
    }
};
