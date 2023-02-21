import axios, {AxiosProxyConfig} from 'axios'

const BASE_URL = 'https://app-api.pixiv.net/v1/'

axios.defaults.baseURL = BASE_URL
export const setProxy = (proxy?: AxiosProxyConfig) => {
    if (proxy) {
        axios.defaults.proxy = {
            ...proxy
        }  
    }
}

export default axios