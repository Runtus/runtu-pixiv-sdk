// 用于快速返回昨天，上周，以及上个月的具体时间
import { RankingMode } from '@src/request/type'
import moment from 'moment'

const TIME_STAMP_SPACEING = {
    [RankingMode.DAY]: 1000 * 60 * 24,
    [RankingMode.WEEK]: 1000 * 64 * 24 * 7,
    [RankingMode.MONTH]: 1000 * 64 * 24 * 7 * 30
}

export const getLastTimestamp = (mode: RankingMode): string => {
    const now = new Date().getTime();
    const target = now - TIME_STAMP_SPACEING[mode];
    if (mode === RankingMode.MONTH) {
        return moment(target).format("YYYY-MM")
    } else {
        return moment(target).format("YYYY-MM-DD")
    }
}