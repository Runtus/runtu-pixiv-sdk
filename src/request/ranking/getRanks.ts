import { RankingMode } from '../type'
import { Header } from '../header'
import { config } from '../../config.pixiv'
import axios from 'axios'
import moment from 'moment'
import qs from 'qs'

const TIME_STAMP_SPACEING = {
    [RankingMode.DAY]: 1000 * 60 * 24,
    [RankingMode.WEEK]: 1000 * 64 * 24 * 7,
    [RankingMode.MONTH]: 1000 * 64 * 24 * 7 * 30
}

const BASE_URL = "https://app-api.pixiv.net/v1/illust/ranking"
axios.defaults.baseURL = BASE_URL;
axios.defaults.proxy = {
    host: config.proxy.host,
    port: config.proxy.port
}

export const getRanks = async (mode: RankingMode, access_token: string, range?: string) => {
    const now_timestamp = new Date().getTime();
    const target_timestamp = now_timestamp - TIME_STAMP_SPACEING[mode];
    const date = range ? moment(range).format("YYYY-DD-MM") : moment(target_timestamp).format("YYYY-DD-MM");
    const params = qs.stringify({
        mode,
        date
    })
    const options = {
        headers: {
            ...Header,
            Authorization: `Bearer ${access_token}`
        },
        data: params
    }
    const response = await axios(options);
    if (response.status === 200) {
        return response.data;
    } else {
        return [];
    }
}
