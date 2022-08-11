import Router from '@koa/router';
import { DayRanks, WeekRanks, MonthRanks } from './ranking';
import { Search } from './search'

const routers = new Router();

routers.get('/ranks/day', DayRanks)
routers.get('/ranks/week', WeekRanks)
routers.get('/ranks/month', MonthRanks)

routers.get('/illusts/search', Search.illust)
routers.get('/author/search', Search.author)

export default routers;
