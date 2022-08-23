// 
import { getHost, getPort } from '../../request/proxy'
import { tokenBase64 } from './tokenBase64'
import crypto from 'crypto'
import qs from 'qs'
import readline from 'readline-sync'
import axios from 'axios'

const USER_AGENT = "PixivAndroidApp/5.0.234 (Android 11; Pixel 5)"
const LOGIN_URL = "https://app-api.pixiv.net/web/v1/login"
const REDIRECT_URI = "https://app-api.pixiv.net/web/v1/users/auth/pixiv/callback"
const AUTH_TOKEN_URL = "https://oauth.secure.pixiv.net/auth/token"
const CLIENT_ID = 'MOBrBDS8blbauoSck0ZfDbtuzpyT';
const CLIENT_SECRET = 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj';


// 32位的urlbase64随机数 -> sha256加密 -> 用base64编码 -> 

export const getAccessToken = async () => {
    const code_verifier = tokenBase64(32)
    const code_challenge = crypto.createHash('sha256').update(code_verifier).digest('base64').split('/').join('_').split('+').join('-').split('=').join('');
    const login_params = {
        code_challenge,
        code_challenge_method: 'S256',
        client: 'pixiv-android'
    }
    console.log('Please copy the below link to the brower and login using your account')
    console.log(`${LOGIN_URL}?${qs.stringify(login_params)}`)
    const token = readline.question('copy the token and patse it here: ')
    console.log(token)
    const res = await axios({
        url: AUTH_TOKEN_URL,
        method: 'post',
        data: {
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": token,
            "code_verifier": code_verifier,
            "grant_type": "authorization_code",
            "include_policy": "true",
            "redirect_uri": REDIRECT_URI,
        },
        proxy: {
            host: getHost(),
            port: getPort()
        },
        headers: {
            "User-Agent": USER_AGENT,
        }
    }).catch(err => {
        console.log(err)
        return {
            data: {}
        }
    })
    // console.log(res.data)
}

getAccessToken()