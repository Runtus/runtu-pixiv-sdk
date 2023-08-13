import { getKeywordsIllusts } from '@src/request/search/getSearchillusts'
import { RPixivData } from './../type'

export const Illusts= async (token: string, keyword: string) => {
    const search = await getKeywordsIllusts(keyword, token);
    return search;
}