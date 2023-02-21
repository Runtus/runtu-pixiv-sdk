// TypeScript Version: 3.0

type AxiosRequestHeaders = Record<string, string | number | boolean>;

type AxiosResponseHeaders = Record<string, string> & {
  "set-cookie"?: string[]
};

interface AxiosRequestTransformer {
  (data: any, headers?: AxiosRequestHeaders): any;
}

interface AxiosResponseTransformer {
  (data: any, headers?: AxiosResponseHeaders): any;
}

interface AxiosAdapter {
  (config: AxiosRequestConfig): AxiosPromise;
}

interface AxiosBasicCredentials {
  username: string;
  password: string;
}

interface AxiosProxyConfig {
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  protocol?: string;
}

type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

  type responseEncoding =
  | 'ascii' | 'ASCII'
  | 'ansi' | 'ANSI'
  | 'binary' | 'BINARY'
  | 'base64' | 'BASE64'
  | 'base64url' | 'BASE64URL'
  | 'hex' | 'HEX'
  | 'latin1' | 'LATIN1'
  | 'ucs-2' | 'UCS-2'
  | 'ucs2' | 'UCS2'
  | 'utf-8' | 'UTF-8'
  | 'utf8' | 'UTF8'
  | 'utf16le' | 'UTF16LE';

interface TransitionalOptions {
  silentJSONParsing?: boolean;
  forcedJSONParsing?: boolean;
  clarifyTimeoutError?: boolean;
}

interface AxiosRequestConfig<D = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
  transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  headers?: AxiosRequestHeaders;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: D;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  adapter?: AxiosAdapter;
  auth?: AxiosBasicCredentials;
  responseType?: ResponseType;
  responseEncoding?: responseEncoding | string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  transitional?: TransitionalOptions;
  signal?: AbortSignal;
  insecureHTTPParser?: boolean;
}

interface AxiosResponse<T = any, D = any>  {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}

interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

interface Cancel {
  message: string | undefined;
}

interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}

declare enum RankingMode {
    DAY = "day",
    WEEK = "week",
    MONTH = "month"
}
declare type UserIllustsType = 'manga' | 'illust';
declare type WebPixivType = {
    illusts: Array<{
        id: string;
        image_urls: {
            large: string;
            medium: string;
            square_medium: string;
        };
        title: string;
        user: {
            id: string;
            name: string;
        };
        meta_single_page: {
            original_image_url: string;
        };
    }>;
    next_url: string;
};
declare type PixivPic = {
    title: string;
    id: string;
    url: string;
    author: string;
};

declare type RPixivData = {
    code: 200 | 400;
    data: {
        illusts: WebPixivType['illusts'];
        date?: string;
    };
    info: string;
};

declare type DecortorParamsFn = (token: string, ...params: any[]) => any;

declare class RPixiv {
    static TIMESTAMP: number;
    private accessToken;
    private refreshToken;
    private startTime;
    private proxy_config;
    constructor(proxy?: AxiosProxyConfig);
    axiosProxyInit(): void;
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
    setStartTime(time: number): void;
    checkTime(): Promise<void>;
    init(): Promise<void>;
    decoratorForData(fn: DecortorParamsFn, ...params: any): Promise<any>;
    getDayRanks(range: string): Promise<RPixivData>;
    getWeekRanks(range: string): Promise<RPixivData>;
    getMonthRanks(range: string): Promise<RPixivData>;
    searchIllusts(keywords: string): Promise<RPixivData>;
    getAuthorIllusts(id: string, iType?: UserIllustsType): Promise<any>;
    getAuthorInfo(id: string): Promise<any>;
    getPixivUrlData(url: string, rType?: AxiosRequestConfig['responseType']): Promise<any>;
}

export { DecortorParamsFn, PixivPic, RPixiv, RPixivData, RankingMode, UserIllustsType, WebPixivType };
