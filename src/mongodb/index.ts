import config from './config';
import { MongoClient } from 'mongodb';

const { url, options } = config;

const client = new MongoClient(url, options);

const DB_NAME = 'pixiv';

let count = 0;

const connection = async (db_name?: string) => {
    count++;
    await client.connect();
    console.log('MongoDB server connect success');
    const db = client.db(db_name || DB_NAME);
    return db;
};

// 因为connection只需要连接一次
export const chooseCollection = async (collection_name: string, db_name?: string) => {
    const db = await connection(db_name);
    const collection = db.collection(collection_name);
    return collection;
};

export const close = () => {
    count--;
    if (count === 0) {
        client
            .close()
            .then(() => {
                console.log('数据库关闭');
            })
            .catch(err => {
                console.log('数据库关闭失败，请查阅日志: ');
                console.error(err);
            });
    }
};
