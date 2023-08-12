export namespace PixivConst {
    export namespace Request {
        export const USER_AGENT = 'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)';
        export const CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    export namespace Token {
        export const CLIENT_ID = 'MOBrBDS8blbauoSck0ZfDbtuzpyT';
        export const CLIENT_SECRET = 'lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj';
        export const HASH_SECRET = '28c1fdd170a5204386cb1313c7077b34f83e4aaf4aa829ce78c231e05b0bae2c'
    }
}

export enum STATUS_CODE {
    SUCCESS = 200,
    FAILED = 400
}