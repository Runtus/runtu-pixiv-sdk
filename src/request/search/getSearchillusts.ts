import axios from '../axios.pixiv.api'
import qs from 'qs'
import { WebPixivType } from '../type'
import { Header } from '@src/request/header'

export const getKeywordsIllusts = async (keywords: string, access_token: string): Promise<WebPixivType> => {
    const params = qs.stringify({
        search_target: 'partial_match_for_tags',
        filter: 'for_ios',
        word: keywords
    })
    const response = await axios({
        url: `/search/popular-preview/illust?${params}`,
        headers: {
            ...Header,
            Authorization: `Bearer ${access_token}`,
        }
    })
    
    if (response.status === 200) {
        return response.data
    } else {
        console.error('请求异常')
        return {
            illusts: [],
            next_url: ''
        }
    }
}