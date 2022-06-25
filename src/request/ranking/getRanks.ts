import { RankingMode } from '../type';
import { Header } from '../header';
import { config } from '../../config.pixiv';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';

const BASE_URL = 'https://app-api.pixiv.net';
axios.defaults.baseURL = BASE_URL;
axios.defaults.proxy = {
    host: config.proxy.host,
    port: config.proxy.port,
};

export const getRanks = async (mode: RankingMode, access_token: string, range?: string) => {
    const date = range ? moment(range).format('YYYY-MM-DD') : moment().subtract(1, 'days').format('YYYY-MM-DD');
    console.log(date);
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
    if (response.status === 200) {
        return response.data;
    } else {
        return [];
    }
};
