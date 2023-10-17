declare enum STATUS_CODE {
    SUCCESS = 200,
    FAILED = 400
}

declare enum RankingMode {
    DAY = "day",
    WEEK = "week",
    MONTH = "month"
}
type UserIllustsType = 'manga' | 'illust';
/** 通过API获得的相关数据的数据类型 */
type Author = {
    id: string;
    name: string;
    account: string;
    profile_image_urls: {
        medium?: string;
    };
    is_followed: boolean;
    is_access_blocking_user?: boolean;
};
type AuthorIllusts = {
    user: Author;
} & WebPixivType;
type AuthorInfo = {
    user: Author;
    profile: {
        webpage: any;
        gender: string;
        birth: string;
        birth_day: number;
        region: string;
        address_id: number;
        country_code: string;
        job: string;
        job_id: number;
        total_follow_users: number;
        total_mypixiv_users: number;
        total_illusts: number;
        total_manga: number;
        total_novels: number;
        total_illust_bookmarks_public: number;
        total_illust_series: number;
        total_novel_series: number;
        background_image_url: string;
        twitter_account: string;
        twitter_url: string;
        pawoo_url: string;
        is_premium: boolean;
        is_using_custom_profile_image: boolean;
    };
    profile_publicity: {
        gender: string;
        region: string;
        birth_day: string;
        birth_year: string;
        job: string;
        pawoo: boolean;
    };
    workspace: {
        pc: string;
        monitor: string;
        tool: string;
        scanner: string;
        tablet: string;
        mouse: string;
        printer: string;
        desktop: string;
        music: string;
        desk: string;
        chair: string;
        comment: string;
    };
};
type Illust = {
    id: number;
    title: string;
    type: string;
    image_urls: {
        large: string;
        medium: string;
        square_medium: string;
    };
    caption: string;
    restrict: number;
    user: Author;
    tags: Array<{
        name: string;
        translated_name: string | null;
    }>;
    tools: Array<any>;
    create_date: string;
    page_count: number;
    width: number;
    height: number;
    sanity_level: number;
    x_restrict: number;
    series: Object;
    meta_single_page: {
        original_image_url: string;
    };
    meta_pages: Array<Illust["image_urls"] & Illust["meta_single_page"]>;
    total_view: number;
    total_bookmarks: number;
    is_bookmarked: boolean;
    visible: boolean;
    is_muted: boolean;
    illust_ai_type: number;
    illust_book_style: number;
};
type WebPixivType = {
    illusts: Array<Illust>;
    next_url?: string;
};
type PixivPic = {
    title: string;
    id: string;
    url: string;
    author: string;
};
type PixivResponse<T> = Promise<{
    status: STATUS_CODE;
    data: T;
    err?: any;
}>;
type PixivToken = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scpoe: string;
    refresh_token: string;
    user: Author & {
        mail_address: string;
        is_premium: boolean;
        x_restrict: number;
        is_mail_authorized: boolean;
        require_policy_agreement: boolean;
    };
    response: PixivToken;
};
/** 通过Web爬虫获取到的数据的相关数据类型 */
type IllustWeb = {
    id: string;
    title: string;
    description: string;
    createDate: string;
    updateDate: string;
    image_urls: {
        regular: string;
        original: string;
    };
    author: {
        id: string;
        name: string;
    };
    tags: Array<string>;
};

type RPixivData = {
    code: 200 | 400;
    data: {
        illusts: WebPixivType['illusts'];
        date?: string;
    };
    info: string;
};

type DecortorParamsFn<T> = (token: string, ...params: any[]) => T;

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

declare class RPixiv {
    static TIMESTAMP: number;
    private accessToken;
    private refreshToken;
    private startTime;
    private proxy_config;
    constructor(proxy?: AxiosProxyConfig);
    private axiosProxyInit;
    private setAccessToken;
    private setRefreshToken;
    private setStartTime;
    private checkTime;
    token(): Promise<void>;
    private decoratorForData;
    getDayRanks(range: string): Promise<{
        status: STATUS_CODE;
        data: WebPixivType;
        err?: any;
    }>;
    getWeekRanks(range: string): Promise<{
        status: STATUS_CODE;
        data: WebPixivType;
        err?: any;
    }>;
    getMonthRanks(range: string): Promise<{
        status: STATUS_CODE;
        data: WebPixivType;
        err?: any;
    }>;
    searchIllusts(keywords: string): Promise<{
        status: STATUS_CODE;
        data: WebPixivType;
        err?: any;
    }>;
    searchIllustsById(id: string): Promise<{
        status: STATUS_CODE;
        data: IllustWeb;
        err?: any;
    }>;
    getAuthorIllusts(id: string, iType?: UserIllustsType): Promise<{
        status: STATUS_CODE;
        data: AuthorIllusts;
        err?: any;
    }>;
    getAuthorInfo(id: string): Promise<{
        status: STATUS_CODE;
        data: AuthorInfo;
        err?: any;
    }>;
    getPixivStream(url: string, rType?: AxiosRequestConfig['responseType']): Promise<any>;
}

export { Author, AuthorIllusts, AuthorInfo, DecortorParamsFn, Illust, IllustWeb, PixivPic, PixivResponse, PixivToken, RPixiv, RPixivData, RankingMode, UserIllustsType, WebPixivType };
