import { getAuthorInfo } from '@src/request/user/getUserDetail'

// test id: 15989854

export const Details = async (token: string, id: string) => {
    const response = await getAuthorInfo(id, token)
    return response
}