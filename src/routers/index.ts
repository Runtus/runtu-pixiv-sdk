import { DayRanks, WeekRanks, MonthRanks } from './ranking';
import { searchIllusts } from './search'
import { getUserInfo } from './user'

export const PixivRequestSpace = {
    getDayRanks: DayRanks,
    getWeekRanks: WeekRanks,
    getMonthRanks: MonthRanks,
    searchIllusts,
    getAuthorIllusts: getUserInfo.illusts,
    getAuthorInfo: getUserInfo.details
}






