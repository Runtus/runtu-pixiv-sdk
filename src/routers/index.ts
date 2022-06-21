import Router from '@koa/router'
import { DayRanks, WeekRanks, MonthRanks } from './ranking'
import { OssDayRanks, OssMonthRanks, OssWeekRanks } from './oss'

const routers = new Router();

routers.get('/ranks/day', DayRanks);
routers.get('/ranks/week', WeekRanks);
routers.get('/ranks/month', MonthRanks);

routers.get('/oss/day', OssDayRanks);
routers.get('/oss/week', OssWeekRanks);
routers.get('/oss/month', OssMonthRanks);

export default routers;