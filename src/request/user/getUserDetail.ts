// /v1/user/detail  用户/画师主页信息

import { PixivAxios } from '../axios.pixiv.api'
import qs from 'qs'
import { Header } from '@src/request/header'


export const getAuthorInfo = async (id: string, access_token: string) => {
    const params = qs.stringify({
        user_id: id
    })

    const response = await PixivAxios.pAxios({
        url: `${PixivAxios.APIV1.URL}/user/detail?${params}`,
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
