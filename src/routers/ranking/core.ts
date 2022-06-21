import { Middleware } from '@koa/router'
import { RankingMode } from '@src/request/type'
import { getRanks } from '@src/request/ranking/getRanks'

export const RanksCore: (mode: RankingMode) => Middleware = (mode) => {
    return async (ctx, next) => {
        const access_token = ctx.token.access_token;
        const range = ctx.query.range || '';
        const pixiv_images = await getRanks(mode, access_token, range as string);
        console.log(pixiv_images.illusts)
        ctx.body = {
            code: 200,
            data: pixiv_images.illusts ? pixiv_images.illusts : [],
            info: pixiv_images.illusts ? '获取图片成功' : '获取图片失败'
        }
    }
}
