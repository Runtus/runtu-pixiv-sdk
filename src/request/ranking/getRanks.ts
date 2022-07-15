import { RankingMode, WebPixivType } from '../type';
import { Header } from '../header';
import { config } from '../../config.pixiv';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';

type RanksIllusts = {
    data: WebPixivType,
    date: string
}

const BASE_URL = 'https://app-api.pixiv.net';
axios.defaults.baseURL = BASE_URL;
axios.defaults.proxy = {
    host: config.proxy.host,
    port: config.proxy.port,
};

let retry = 0;
// range为用户指定的时间
export const getRanks = async (mode: RankingMode, access_token: string, range?: string): Promise<RanksIllusts> => {
    const date = range ? moment(range).format('YYYY-MM-DD') : moment().subtract(1, 'days').format('YYYY-MM-DD');
    const params = qs.stringify({
        mode,
        filter: 'for_ios',
        date,
    });
    const options = {
        url: `/v1/illust/ranking?${params}`,
        headers: {
            ...Header,
            Authorization: `Bearer ${access_token}`,
        },
    };
    const response = await axios(options);
    retry++;
    // 没请求到数据返回空
    if (response.status !== 200) {
        retry = 0;
        return {
            date,
            data: {
                illusts: [],
                next_url: ''
            }
        };
    }

    // 如果请求次数超过五次，则取消本次请求
    if (response.data.illusts.length > 0 || retry > 5) {
        retry = 0;
        return {
            date,
            data: response.data
        };
    } else {
        // 说明榜单还没更新，直接获取两天前的榜单
        return getRanks(mode, access_token, moment().subtract(2,'days').format('YYYY-MM-DD'))
    }
};
