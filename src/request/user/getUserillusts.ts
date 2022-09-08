import axios from '../axios.pixiv.api'
import qs from 'qs'
import { Header } from '../header'
import { UserIllustsType } from '../type'

export const getUserIllusts = async (id: string, type: UserIllustsType, access_token: string) => {
    const query = qs.stringify({
        user_id: id,
        type,
        filter: 'for_ios'
    })
    
    console.log('query', query)
    const response = await axios({
        url: `/user/illusts?${query}`,
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