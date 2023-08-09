import { getKeywordsIllusts } from '@src/request/search/getSearchillusts'
import { RPixivData } from './../type'

export const Illusts: (token: string, keyword: string) => Promise<RPixivData> = async (token, keyword) => {
    const search = await getKeywordsIllusts(keyword, token);
    if (search.illusts.length) {
        return {
            code: 200,
            data: {
                illusts: search.illusts
            },
            info: '获取图片成功'
        }
    } else {
        return {
            code: 400,
            data: {
                illusts: []
            },
            info: '未找到关键字相关插图'
        }
    }
}