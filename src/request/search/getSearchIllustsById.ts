// 通过pid来获得图片
import { PixivAxios } from '../axios.pixiv.api'
import qs from 'qs'
import { PixivResponse, WebPixivType } from '../type'
// https://www.pixiv.net/artworks/112464167

// TODO 暂不支持R18的搜索，因为Web端的认证方式和移动端不同
export const getIdsIllusts = async (access_token: string, id: string) => {
    const response = await PixivAxios.pAxios({
        url: `${PixivAxios.WEB_URL.URL}/artworks/${id}`,
        headers: {
            ...PixivAxios.WebHeaders,
            Cookie: `PHPSESSID=${process.env.PHPSESSIONID};`
        }
    })

    return response
}