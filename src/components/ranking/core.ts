import { PixivResponse, RankingMode, WebPixivType } from '@src/request/type';
import { getRanks } from '@src/request/ranking/getRanks';

export const RanksCore: (mode: RankingMode) => (token: string, range: string) => PixivResponse<WebPixivType> = (mode) => {
    return async (token, range) => {
        return  getRanks(mode, token, range)
    };
};
