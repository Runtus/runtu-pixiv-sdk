// 下载pixiv的图片
import axios from 'axios';
import { getHost, getPort } from './proxy'

axios.defaults.proxy = {
    port: getPort(),
    host: getHost()
}

const referer = "https://app-api.pixiv.net/"

export const getPicStream = async (url: string) => {
    const stream = await axios({
        url,
        headers: {
            "Referer": referer
        },
        responseType: "stream"
    });
    console.log('url',url)
    console.log('stream',stream.data)
    if (stream.status === 200) {
        return stream.data
    } else {
        return ""
    }
}
