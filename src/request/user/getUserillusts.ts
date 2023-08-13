import  { PixivAxios } from '../axios.pixiv.api'
import qs from 'qs'
import { UserIllustsType, PixivResponse, AuthorIllusts  } from '../type'

export const getUserIllusts: (id: string, type: UserIllustsType, access_token: string) => PixivResponse<AuthorIllusts> = async (id, type, access_token) => {
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
    })

    return response
}