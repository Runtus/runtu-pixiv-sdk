import { Middleware } from '@koa/router'
import { getKeywordsIllusts } from '@src/request/search/getSearchillusts'

export const Search: Middleware = async (ctx, next) => {
    const keyword = ctx.query.keyword as string || '';
    const access_token = ctx.token.access_token;
    const search = await getKeywordsIllusts(keyword, access_token);
    if (search.illusts.length) {
        ctx.body = {
            code: 200,
            data: search.illusts,
            info: '获取图片成功'
        }
    } else {
        ctx.body = {
            code: 400,
            data: [],
            info: '未找到关键字相关插图'
        }
    }
}