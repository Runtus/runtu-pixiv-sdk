import { STATUS_CODE } from '@src/const'
import { getKeywordsIllusts } from '@src/request/search/getSearchillusts'
import { getIdsIllusts } from '@src/request/search/getSearchIllustsById'
import { IllustWeb, PixivResponse } from '@src/type'
import * as cheerio from 'cheerio'

const formatWebIllusts: (content: string, id: string) => IllustWeb = (content, id) => {
    let data: IllustWeb = null;
    try {
        const format = JSON.parse(content);
        // console.log(format)
        const illust = format.illust[id];
        data = {
            id: illust.illustId,
            title: illust.illustTitle,
            author: {
                id: illust.userId,
                name: illust.userName
            },
            createDate: illust.createDate,
            updateDate: illust.uploadDate,
            image_urls: {
                regular: illust.urls.regular,
                original: illust.urls.original
            },
            description: illust.description,
            tags: illust.tags.tags.map((item: any) => item.tag)
        }
    } catch (err) {
        console.error(err);
        console.log(`获取作品(id: ${id})信息失败，请检查作品是否存在或id是否正确`);
    }

    return data;
}

// 通过关键字来获得作品
export const Illusts= async (token: string, keyword: string) => {
    const search = await getKeywordsIllusts(keyword, token);
    return search;
}

// 通过id来获得作品
export const IllustsById: (t: string, id: string) => PixivResponse<IllustWeb> = async (token: string, id: string) => {
    try {
        const htmlContent = (await getIdsIllusts(token, id)).data;
        const $ = cheerio.load(htmlContent);
        const content_str = $("#meta-preload-data").attr("content");
        let content = formatWebIllusts(content_str, id);
        return {
            status: STATUS_CODE.SUCCESS,
            data: content,
            err: null
        };
    } catch (err) {
        console.error(err);
        return {
            status: STATUS_CODE.FAILED,
            data: null,
            err: "检查作品id是否正确"
        }
    }
}