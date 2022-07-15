import { Middleware } from '@koa/router';
import { RankingMode } from '@src/request/type';
import { getRanks } from '@src/request/ranking/getRanks';

export const RanksCore: (mode: RankingMode) => Middleware = mode => {
    return async (ctx, next) => {
        const access_token = ctx.token.access_token;
        const range = ctx.query.range || '';
        const {data: pixiv_images, date} = await getRanks(mode, access_token, range as string);
        ctx.body = {
            code: 200,
            data: {
                date,
                illusts: pixiv_images.illusts
            },
            info: pixiv_images.illusts.length ? '获取图片成功' : '获取图片失败',
        };
    };
};
