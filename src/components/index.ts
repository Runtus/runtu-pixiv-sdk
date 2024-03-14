import { DayRanks, WeekRanks, MonthRanks } from './ranking';
import { searchIllusts, searchIllustsById } from './search'
import { getUserInfo } from './user'
import { getPixivUrlData } from './url'
import { refreshAccessToken, initRefreshToken } from './token'

export const PixivRequestSpace = {
    getDayRanks: DayRanks,
    getWeekRanks: WeekRanks,
    getMonthRanks: MonthRanks,
    searchIllusts,
    searchIllustsById,
    getPixivUrlData,
    getAuthorIllusts: getUserInfo.illusts,
    getAuthorInfo: getUserInfo.details
}

export const PixivTokenRequestSpace = {
    refreshAccessToken,
    initRefreshToken
}
