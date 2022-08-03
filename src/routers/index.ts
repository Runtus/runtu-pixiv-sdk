import Router from '@koa/router';
import { DayRanks, WeekRanks, MonthRanks } from './ranking';
import { OssDayRanks, OssMonthRanks, OssWeekRanks } from './oss';
import { Search } from './search'

const routers = new Router();

routers.get('/ranks/day', DayRanks);
routers.get('/ranks/week', WeekRanks);
routers.get('/ranks/month', MonthRanks);

// 因为pixiv-cdn的存在，不需要oss进行中转存储
// routers.get('/oss/day', OssDayRanks);
// routers.get('/oss/week', OssWeekRanks);
// routers.get('/oss/month', OssMonthRanks);

routers.get('/illusts/search', Search.illust);
routers.get('/author/search', Search.author)

export default routers;
