import { getAccessToken } from './getAccessToken'
import { getRefreshToken } from './getRefreshToken'


export namespace Token {
    export const access = getAccessToken
    export const refresh = getRefreshToken
}