import { DayRanks, WeekRanks, MonthRanks } from './ranking';
import { searchIllusts, searchIllustsById } from './search'
import { getUserInfo } from './user'
import { getPixivUrlData } from './url'

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


