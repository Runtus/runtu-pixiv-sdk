import axios from 'axios'
import { getHost, getPort } from './proxy'

const BASE_URL = 'https://app-api.pixiv.net/v1/'

axios.defaults.baseURL = BASE_URL
axios.defaults.proxy = {
    host: getHost(),
    port: getPort()
}

export default axios