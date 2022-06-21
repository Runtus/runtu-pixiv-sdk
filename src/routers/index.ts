import Router from '@koa/router'
import { DayRanks, WeekRanks, MonthRanks } from './ranking'

const routers = new Router();

routers.get('/ranks/day', DayRanks);
routers.get('/ranks/week', WeekRanks);
routers.get('/ranks/month', MonthRanks);

routers.get('/oss/day')

export default routers;