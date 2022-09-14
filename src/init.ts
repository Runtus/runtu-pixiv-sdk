import { getAccessTokenCache } from '@src/routers/load'

export namespace Init {
    export const tokenCache = async () => {
        let result = await getAccessTokenCache()
        while (result.refresh_token.length === 0) {
            console.log('登录失败，马上进行重复登录')
            result = await getAccessTokenCache()
        }
    }
}