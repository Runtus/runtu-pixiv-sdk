import  { PixivAxios } from '../axios.pixiv.api'
import qs from 'qs'
import { UserIllustsType } from '../type'

export const getUserIllusts = async (id: string, type: UserIllustsType, access_token: string) => {
    const query = qs.stringify({
        user_id: id,
        type,
        filter: 'for_ios'
    })

    const response = await PixivAxios.pAxios({
        method: "GET",
        url: `${PixivAxios.APIV1.URL}/user/illusts?${query}`,
        headers: {
            ...PixivAxios.GeneralHeaders,
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