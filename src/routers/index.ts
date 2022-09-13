import Router from '@koa/router';
import { DayRanks, WeekRanks, MonthRanks } from './ranking';
import { Search } from './search'
import { User } from './user'

const routers = new Router();

routers.get('/ranks/day', DayRanks)
routers.get('/ranks/week', WeekRanks)
routers.get('/ranks/month', MonthRanks)

routers.get('/illusts/search', Search.illust)

routers.get('/user/detail', User.Detail)
routers.get('/user/illusts', User.Illusts)

export default routers;
