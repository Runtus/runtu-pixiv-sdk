// 请求本地pixiv服务
import { RankingMode, PixivPic, WebPixivType } from '../type'
import { getRanks } from '@src/request/ranking/getRanks'

export const getPixivUrls = async (mode: RankingMode, access_token: string) => {
    const pixivPics: PixivPic[] = []
    const result = await getRanks(mode, access_token) as WebPixivType;

    if (result.illusts) {
        result.illusts.forEach(item => {
            pixivPics.push({
                id: item.id,
                url: item.image_urls.large,
                title: item.title,
                author: item.user.name
            })
        })
    }
    return pixivPics
}