// 下载pixiv的图片
import axios, { AxiosRequestConfig, AxiosProxyConfig} from 'axios';
import { getHost, getPort } from './proxy';

export const setProxy = (proxy: AxiosProxyConfig) => {
    axios.defaults.proxy = proxy
}

const referer = 'https://app-api.pixiv.net/';

export const getPic = async (url: string, rType ?: AxiosRequestConfig['responseType']) => {
    const stream = await axios({
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
