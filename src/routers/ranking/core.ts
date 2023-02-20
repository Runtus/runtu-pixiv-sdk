import { RankingMode } from '@src/request/type';
import { getRanks } from '@src/request/ranking/getRanks';

export const RanksCore = (mode: RankingMode) => {
    return async (access_token: string, range: string) => {
        const { data: pixivImages, date } = await getRanks(mode, access_token, range as string);
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
