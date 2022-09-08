// 获取对应作者的插画
import { Middleware } from '@koa/router'
import { getUserIllusts } from '@src/request/user/getUserillusts'
import { UserIllustsType } from '@src/request/type'

// id: string, type: string
export const UserIllusts: Middleware = async (ctx, next) => {
    const id = ctx.query.id as string || ''
    const type = ctx.query.type as UserIllustsType || 'illust' // 缺省为插画类型
    const access_token = ctx.token.access_token
    const illusts = await getUserIllusts(id, type, access_token)
    if (illusts.status === 200) {
        ctx.body = {
            code: 200,
            info: '获取作者插画信息成功',
            data: illusts.data,
        }
    } else {
        ctx.body = {
            code: 400,
            data: {},
            info: '获取作者信息失败，请检查id是否正确'
        }
    }
}