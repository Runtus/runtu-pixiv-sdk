import { getKeywordsIllusts } from '@src/request/search/getSearchillusts'

export const Illusts = async (token: string, keyword: string) => {
    const search = await getKeywordsIllusts(keyword, token);
    if (search.illusts.length) {
        return {
            code: 200,
            data: search.illusts,
            info: '获取图片成功'
        }
    } else {
        return {
            code: 400,
            data: [],
            info: '未找到关键字相关插图'
        }
    }
}