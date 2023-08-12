// /v1/user/detail  用户/画师主页信息

import { PixivAxios } from '../axios.pixiv.api'
import qs from 'qs'
import { Header } from '@src/request/header'
import { AuthorInfo, PixivResponse } from '../type'


export const getAuthorInfo: (id: string, access_token: string) => PixivResponse<AuthorInfo> = async (id, access_token) => {
    const params = qs.stringify({
        user_id: id
    })

    const response = await PixivAxios.pAxios({
        url: `${PixivAxios.APIV1.URL}/user/detail?${params}`,
        headers: {
            ...Header,
            Authorization: `Bearer ${access_token}`,
        }
    })

    return response
}
