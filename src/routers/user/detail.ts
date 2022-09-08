import { Middleware } from '@koa/router'
import { getAuthorInfo } from '@src/request/user/getUserDetail'

// test id: 15989854

export const Details: Middleware = async (ctx, next) => {
    const authorid = ctx.query.id as string || ''
    const access_token = ctx.token.access_token
    const response = await getAuthorInfo(authorid, access_token)
    
    if (response.status === 200) {
        ctx.body = {
            code: 200,
            data: response.data,
            info: '获取作者信息成功'
        }
    } else {
        ctx.body = {
            code: 400,
            data: {},
            info: '获取作者信息失败，请检查id是否正确'
        }
    }
}