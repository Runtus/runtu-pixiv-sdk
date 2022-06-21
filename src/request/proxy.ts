import { config } from '../config.pixiv'

export const getProxy = () => {
    const host = config.proxy.host ? `http://${config.proxy.host}` : "http://127.0.0.1";
    const port = config.proxy.port ? config.proxy.port : 7890;
    return `${host}:${port}`
}