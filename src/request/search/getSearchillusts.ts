import { PixivAxios } from '../axios.pixiv.api'
import qs from 'qs'
import { WebPixivType, PixivResponse } from '../type'

export const getKeywordsIllusts: (k: string, a: string) => PixivResponse<WebPixivType> = async (keywords, access_token) => {
    const params = qs.stringify({
        search_target: 'partial_match_for_tags',
        filter: 'for_ios',
        word: keywords
    })
    const response = await PixivAxios.pAxios({
        url: `${PixivAxios.APIV1.URL}/search/popular-preview/illust?${params}`,
        headers: {
            ...PixivAxios.GeneralHeaders,
            Authorization: `Bearer ${access_token}`,
        }
    })
    
    return response
}