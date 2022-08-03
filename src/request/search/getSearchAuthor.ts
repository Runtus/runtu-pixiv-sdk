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
    })

    if (response.status === 200) {
        return response.data
    } else {
        console.error('获取pixiv作者信息发生异常')
        return {
            
        }
    }
}
