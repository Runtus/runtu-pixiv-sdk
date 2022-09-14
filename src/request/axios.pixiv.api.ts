import axios from 'axios'
import { getHost, getPort } from './proxy'
import { config } from '@src/config.pixiv'

const BASE_URL = 'https://app-api.pixiv.net/v1/'

axios.defaults.baseURL = BASE_URL
if (config.proxy.status) {
    axios.defaults.proxy = {
        host: getHost(),
        port: getPort()
    }
}

export default axios