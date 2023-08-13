// 获取对应作者的插画
import { getUserIllusts } from '@src/request/user/getUserillusts'
import { UserIllustsType } from '@src/request/type'

// id: string, type: string
export const UserIllusts = async (token: string, id: string, types: UserIllustsType = "illust") => {
    const illusts = await getUserIllusts(id, types, token)
    return illusts
}