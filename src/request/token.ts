// @ts-ignore
import request from 'request'
import { Header as headers } from './header'
import { config } from '../config.pixiv'
import { getProxy } from './proxy'
import qs from 'qs'

// pixiv内置参数
const BASE_URL = 'https://oauth.secure.pixiv.net/auth/token';
const CLIENT_ID = "MOBrBDS8blbauoSck0ZfDbtuzpyT"
const CLIENT_SECRET = "lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj"
const HASH_SECRET = "28c1fdd170a5204386cb1313c7077b34f83e4aaf4aa829ce78c231e05b0bae2c"
const FAIL_CALLBACK_INFO = ""


// 请求体伪造
const body = qs.stringify({
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "grant_type": "refresh_token",
    hash_secret: HASH_SECRET,
    "get_secure_url": 1,
    "include_policy": true,
    "refresh_token": config.pixiv.refresh_token
})

export const getAccessToken = () => new Promise<string>((resolve, reject) => {
    const proxy_config = getProxy();
    const R = request.defaults({ proxy:  proxy_config });
    const options = {
        method: 'post',
        url: BASE_URL,
        headers,
        body
    }
    R(options, (err: any, res: any) => {
        if (err) {
            console.error(err)
            reject(FAIL_CALLBACK_INFO)
        } else {
            try {
                const body = JSON.parse(res.body)
                resolve(body.access_token as string)
            }
            catch (err) {
                console.error(err)
                reject(FAIL_CALLBACK_INFO)
            }
        }
    })
})

export const gerRefreshToken = () => config.pixiv.refresh_token;