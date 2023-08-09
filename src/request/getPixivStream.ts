// 下载pixiv的图片
import { AxiosRequestConfig } from 'axios';
import { PixivAxios } from './axios.pixiv.api'

const referer = 'https://app-api.pixiv.net/';

export const getPic = async (url: string, rType ?: AxiosRequestConfig['responseType']) => {
    const stream = await PixivAxios.pAxios({
        url,
        headers: {
            Referer: referer,
        },
        responseType: rType,
    });

    if (stream.status === 200) {
        return stream.data;
    } else {
        return '';
    }
};
