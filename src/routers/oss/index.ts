import { OssUrls } from './core'
import { RankingMode } from '@src/request/type'

export const OssDayRanks = OssUrls(RankingMode.DAY);
export const OssWeekRanks = OssUrls(RankingMode.WEEK);
export const OssMonthRanks = OssUrls(RankingMode.MONTH);
