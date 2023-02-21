import { getAuthorInfo } from '@src/request/user/getUserDetail'

// test id: 15989854

export const Details = async (token: string, id: string) => {
    const response = await getAuthorInfo(id, token)
    if (response.status === 200) {
        return {
            code: 200,
            data: response.data,
            info: '获取作者信息成功'
        }
    } else {
        return {
            code: 400,
            data: {},
            info: '获取作者信息失败，请检查id是否正确'
        }
    }
}