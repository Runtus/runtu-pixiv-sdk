import { RankingMode } from '@src/request/type';
import { getRanks } from '@src/request/ranking/getRanks';
import { RPixivData } from './../type'

export const RanksCore: (mode: RankingMode) => (token: string, range: string) => Promise<RPixivData> = (mode) => {
    return async (token, range) => {
        const { data: pixivImages, date } = await getRanks(mode, token, range);
        return {
            code: 200,
            data: {
                date,
                illusts: pixivImages.illusts,
            },
            info: pixivImages.illusts.length ? '获取图片成功' : '获取图片失败',
        };
    };
};
