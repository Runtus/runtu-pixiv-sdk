import { DayRanks, WeekRanks, MonthRanks } from './ranking';
import { searchIllusts } from './search'
import { getUserInfo } from './user'
import { getPixivUrlData } from './url'

export const PixivRequestSpace = {
    getDayRanks: DayRanks,
    getWeekRanks: WeekRanks,
    getMonthRanks: MonthRanks,
    searchIllusts,
    getPixivUrlData,
    getAuthorIllusts: getUserInfo.illusts,
    getAuthorInfo: getUserInfo.details
}






