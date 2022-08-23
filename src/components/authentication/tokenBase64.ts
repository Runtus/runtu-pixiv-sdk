import ctypto from 'crypto'
import base64 from 'base64url'


export const tokenBase64: (size: number) => string = (size) => {
    return base64(ctypto.randomBytes(size))
}