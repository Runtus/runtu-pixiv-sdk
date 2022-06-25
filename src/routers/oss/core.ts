import { Middleware } from '@koa/router';
import { RankingMode } from '@src/request/type';
import { getPicsUrls } from '@src/components/oss/pixiv';
import { getPixivUrls } from '@src/request/oss/getWebPixivUrls';
import moment from 'moment';
import { close } from '@src/mongodb/index';

export const OssUrls: (mode: RankingMode) => Middleware = mode => async (ctx, next) => {
    const access_token = ctx.token.access_token;
    const pixivs = await getPixivUrls(mode, access_token);
    const urls = await getPicsUrls(pixivs, mode, (ctx.query.date as string) || moment().subtract(1, 'day').format('YYYY-MM-DD'));
    close();
    ctx.body = {
        data: urls,
        info: 'success',
    };
};
