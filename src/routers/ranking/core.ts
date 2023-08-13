import { PixivResponse, RankingMode, WebPixivType } from '@src/request/type';
import { getRanks } from '@src/request/ranking/getRanks';

export const RanksCore: (mode: RankingMode) => (token: string, offset: string) => PixivResponse<WebPixivType> = (mode) => {
    return async (token, offset) => {
        return  getRanks(mode, token, offset)
    };
};
