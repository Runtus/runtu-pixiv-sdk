import ossClient from './config'
import { getPicStream } from '@src/request/getPixivStream'
import { RankingMode, PixivPic } from '../../request/type'

const OSS_TIME_OUT = 3000

const getOssDicoInfo = async (mode: RankingMode, date: string) => {
    const list = await ossClient.list({
        prefix: `pixiv/${mode}/${date}`,
        "max-keys": "100"
    }, {
        timeout: OSS_TIME_OUT
    });

    if (list.res.status === 200) {
        return list.objects;
    } else {
        return []
    }
}

const storageOss = async (pics: PixivPic[], mode: RankingMode, date: string) => {
    const ossUrls = await Promise.all(pics.map(item => getPicStream(item.url)
        .then(res => {
            if (res) {
                return ossClient.put(`/pixiv/${mode}/${date}/${item.id}-${item.title}-${item.author}.jpg`, res)
            } else {
                return null
            }
        })
        .then(res => {
            return {
                id: item.id,
                title: item.title,
                url: res.url,
                author: item.author,
            }
        })
        .catch(err => {
            console.error(err);
            return {
                id: '',
                title: '404',
                url: 'https://lao-lan-go.oss-cn-beijing.aliyuncs.com/404.png',
                author: '404'
            }
        })
    ))
    return ossUrls;
}


export const getPicsUrls = async (pics: PixivPic[], mode: RankingMode, date: string): Promise<PixivPic[]> => {
    const cache = await getOssDicoInfo(mode, date);
    console.log(cache)
    if (cache.length) {
        return cache.slice(1).map(item => {
            const title = item.name.split('/')[3];
            // 图片的一些源信息包含在title中，并且其已经在storage时使用符号'-'进行分割
            const metaArray = title.split('-');
            const id = metaArray[0], pic_title = metaArray[1], author = metaArray[2];
            return {
                url: item.url,
                title: pic_title,
                author,
                id
            }
        })
    } else {
        return await storageOss(pics, mode, date);
    }
}
