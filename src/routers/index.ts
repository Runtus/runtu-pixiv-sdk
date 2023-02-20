import Router from '@koa/router';
import { DayRanks, WeekRanks, MonthRanks } from './ranking';
import { Search } from './search'
import { User } from './user'

const routers = new Router();

export const PixivRequestSpace = {
    getDayRanks: DayRanks,
    getWeekRanks: WeekRanks,
    getMonthRanks: MonthRanks
}



routers.get('/illusts/search', Search.illust)

routers.get('/user/detail', User.Detail)
routers.get('/user/illusts', User.Illusts)

export default routers;

