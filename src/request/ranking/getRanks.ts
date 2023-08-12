import { RankingMode, WebPixivType, PixivResponse } from '../type';
import { PixivAxios } from '../axios.pixiv.api';
import moment from 'moment';
import qs from 'qs';

type RanksIllusts = {
    data: WebPixivType;
    date: string;
};

let retry = 0;
// range为用户指定的时间
export const getRanks: (mode: RankingMode, t: string, r ?: string) => PixivResponse<WebPixivType> = async (mode, access_token, range)=> {
    const date = range ? moment(range).format('YYYY-MM-DD') : moment().subtract(1, 'days').format('YYYY-MM-DD');
    const params = qs.stringify({
        mode,
        filter: 'for_ios',
        date,
    })

    const options = {
        url: `${PixivAxios.APIV1.URL}/illust/ranking?${params}`,
        headers: {
            ...PixivAxios.GeneralHeaders,
            Authorization: `Bearer ${access_token}`,
        },
    }
    const response = await PixivAxios.pAxios(options);
    retry++;

    // 如果请求次数超过五次，则取消本次请求
    if (response.data.illusts.length > 0 || retry > 5) {
        retry = 0;
        return response
    } else {
        // 说明榜单还没更新，直接获取两天前的榜单
        return getRanks(mode, access_token, moment().subtract(2, 'days').format('YYYY-MM-DD'));
    }
};
