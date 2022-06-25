import ossClient from './config';
import { getPicStream } from '@src/request/getPixivStream';
import { RankingMode, PixivPic } from '../../request/type';
import { chooseCollection, close } from '@src/mongodb/index';

type PixivTopMongoDB = {
    date: string;
    pics: PixivPic[];
};

// 获取oss中对应图片
const getOssUrls = async (mode: RankingMode, date: string) => {
    const collection = await chooseCollection(mode);
    const data =
        (await collection.findOne({
            date: date,
        })) || {};
    return data;
};

const putOssPixiv = async (pics: PixivPic[], mode: RankingMode, date: string) => {
    const ossUrls = await Promise.all(
        pics.map(item =>
            getPicStream(item.url)
                .then(res => {
                    if (res) {
                        return ossClient.put(`/pixiv/${mode}/${date}/${item.id}.jpg`, res);
                    } else {
                        return null;
                    }
                })
                .then(res => {
                    return {
                        id: item.id,
                        title: item.title,
                        url: res.url,
                        author: item.author,
                    };
                })
                .catch(err => {
                    console.error(err);
                    return {
                        id: '',
                        title: '404',
                        url: 'https://lao-lan-go.oss-cn-beijing.aliyuncs.com/404.png',
                        author: '404',
                    };
                })
        )
    );
    return ossUrls;
};

export const getPicsUrls = async (pics: PixivPic[], mode: RankingMode, date: string): Promise<PixivPic[]> => {
    const cache = (await getOssUrls(mode, date)) as unknown as PixivTopMongoDB;
    if (cache.pics) {
        return cache.pics;
    } else {
        const ossUrls = await putOssPixiv(pics, mode, date);
        // 为了不阻塞，不使用await
        await chooseCollection(mode).then(res => {
            res.insertOne({
                date,
                pics: ossUrls,
            });
        });
        return ossUrls;
    }
};
