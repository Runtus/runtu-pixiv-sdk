import { RankingMode } from '@src/request/type'
import { RanksCore } from './core'

export const DayRanks = RanksCore(RankingMode.DAY);
export const WeekRanks = RanksCore(RankingMode.WEEK);
export const MonthRanks = RanksCore(RankingMode.MONTH);