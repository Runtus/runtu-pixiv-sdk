import axios from '../axios.pixiv.api'
import qs from 'qs'
import { Header } from '@src/request/header'

export const getAuthorInfo = async (id: string, access_token: string) => {
    const params = qs.stringify({
        user_id: id
    })

    const response = await axios({
        url: `/user/detail?${params}`,
        headers: {
            ...Header,
            Authorization: `Bearer ${access_token}`,
        }
    }).catch(err => {
        console.error('请求出错，参数不正确', err)
        return {
            status: 400,
            data: {}
        }
    })

    return response
}
