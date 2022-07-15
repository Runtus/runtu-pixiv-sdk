// 请求本地pixiv服务
import { RankingMode, PixivPic, WebPixivType } from '../type';
import { getRanks } from '@src/request/ranking/getRanks';

// 请求Webpixiv图片url，并格式化成需要的格式
export const getPixivUrls = async (mode: RankingMode, access_token: string) => {
    const pixivPics: PixivPic[] = [];
    const {data: result} = (await getRanks(mode, access_token));

    if (result.illusts) {
        result.illusts.forEach(item => {
            pixivPics.push({
                id: item.id,
                url: item.image_urls.large,
                title: item.title,
                author: item.user.name,
            });
        });
    }
    return pixivPics;
};
