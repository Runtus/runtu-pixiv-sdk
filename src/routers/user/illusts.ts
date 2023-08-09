// 获取对应作者的插画
import { getUserIllusts } from '@src/request/user/getUserillusts'
import { UserIllustsType } from '@src/request/type'

// id: string, type: string
export const UserIllusts = async (token: string, id: string, types: UserIllustsType = "illust") => {
    
    const illusts = await getUserIllusts(id, types, token)
    if (illusts.status === 200) {
        return {
            code: 200,
            info: '获取作者插画信息成功',
            data: illusts.data,
        }
    } else {
        return {
            code: 400,
            data: {},
            info: '获取作者信息失败，请检查id是否正确'
        }
    }
}