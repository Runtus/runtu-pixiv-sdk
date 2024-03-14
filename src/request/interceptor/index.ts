// 拦截器主要有以下两个目的：
// 1. 保证每次业务请求的refreshtoken和accesstoken是有效的。
// 2. 防止多次重复的请求发生，即请求的缓存

// url: https://uestc.feishu.cn/docx/AD6edRgqBoRGRexn13DcpfBVnmb

import { PixivRequestSpace, PixivTokenRequestSpace } from '@src/components';



export enum RequestFCNames {
    getDayRanks = "getDayRanks",
    getWeekRanks = "getWeekRanks",
    getMonthRanks = "getMonthRanks",
    searchIllusts = "searchIllusts",
    searchIllustsById = "searchIllustsById",
    getPixivUrlData = "getPixivUrlData",
    getAuthorIllusts = "getAuthorIllusts",
    getAuthorInfo = "getAuthorInfo",
    refreshAccessToken = "refreshAccessToken",
    initRefreshToken = "initRefreshToken"
}

export type RequestFCComponentMappingType = {
    [key in RequestFCNames]: (...params: any) => Promise<any>
}

const RequestMapping: RequestFCComponentMappingType = {
    getDayRanks: PixivRequestSpace.getDayRanks,
    getWeekRanks: PixivRequestSpace.getWeekRanks,
    getMonthRanks: PixivRequestSpace.getMonthRanks,
    searchIllusts: PixivRequestSpace.searchIllusts,
    searchIllustsById: PixivRequestSpace.searchIllustsById,
    getPixivUrlData: PixivRequestSpace.getPixivUrlData,
    getAuthorIllusts: PixivRequestSpace.getAuthorIllusts,
    getAuthorInfo: PixivRequestSpace.getAuthorInfo,
    refreshAccessToken: PixivTokenRequestSpace.refreshAccessToken,
    initRefreshToken: PixivTokenRequestSpace.initRefreshToken
}



// TODO 思考下如何写Promise请求的缓存
// 如何让Promise请求具有缓存效果
// T第一阶段先不做业务请求的cache，先把token的处理逻辑做了
export const RequestProxy = async (fnName: RequestFCNames, ...params: any) => {
    const fn = RequestMapping[fnName];

    // if (fnName === RequestFCNames.refreshAccessToken || fnName === RequestFCNames.initRefreshToken) {
    //     if (!promise) {
    //         promise = fn(...params);
    //         return promise;
    //     } else {
    //         promise = null;
    //         return promise;
    //     }
    // } 
         

    return fn(...params);

}
