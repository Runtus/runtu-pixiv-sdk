import { STATUS_CODE } from '../const'

export enum RankingMode {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
}

// 作者作品类型： 漫画 | 插画
export type UserIllustsType = 'manga' | 'illust';

/** 通过API获得的相关数据的数据类型 */
// 作者概览信息类型
export type Author = {
    id: string;
    name: string;
    account: string;
    profile_image_urls: {
        medium?: string;
    };
    is_followed: boolean;
    is_access_blocking_user?: boolean;
};

export type AuthorIllusts = {
    user: Author;
} & WebPixivType;


// 作者详细信息类型
export type AuthorInfo = {
    user: Author,
    profile: {
        webpage: any,
        gender: string,
        birth: string,
        birth_day: number,
        region: string,
        address_id: number,
        country_code: string,
        job: string,
        job_id: number,
        total_follow_users: number,
        total_mypixiv_users: number,
        total_illusts: number,
        total_manga: number,
        total_novels: number,
        total_illust_bookmarks_public: number,
        total_illust_series: number,
        total_novel_series: number,
        background_image_url: string,
        twitter_account: string,
        twitter_url: string,
        pawoo_url: string,
        is_premium: boolean,
        is_using_custom_profile_image: boolean
    },
    profile_publicity: {
        gender: string,
        region: string,
        birth_day: string,
        birth_year: string,
        job: string,
        pawoo: boolean
    },
    workspace: {
        pc: string,
        monitor: string,
        tool: string,
        scanner: string,
        tablet: string,
        mouse: string,
        printer: string,
        desktop: string,
        music: string,
        desk: string,
        chair: string,
        comment: string,
    }
}

export type Illust = {
    id: number,
    title: string,
    type: string,
    image_urls: {
        large: string, 
        medium: string,
        square_medium: string
    },
    caption: string,
    restrict: number,
    user: Author,
    tags: Array<{
        name: string,
        translated_name: string | null
    }>,
    tools: Array<any>,
    create_date: string,
    page_count: number,
    width: number,
    height: number,
    sanity_level: number,
    x_restrict: number,
    series: Object,
    meta_single_page: {
        original_image_url: string,
    },
    meta_pages: Array<Illust["image_urls"] & Illust["meta_single_page"]>,
    total_view: number,
    total_bookmarks: number,
    is_bookmarked: boolean,
    visible: boolean,
    is_muted: boolean,
    illust_ai_type: number,
    illust_book_style: number
}

// 插画信息定义
export type WebPixivType = {
    illusts: Array<Illust>;
    next_url ?: string;
};

// 自定义Pixiv插画类型
export type PixivPic = {
    title: string;
    id: string;
    url: string;
    author: string;
};



export type PixivResponse<T> = Promise<{
    status: STATUS_CODE,
    data: T,
    err ?: any
}>

// token信息类型
export type PixivToken = {
    access_token: string,
    // 有效时间
    expires_in: number,
    token_type: string
    scpoe: string,
    refresh_token: string,
    user: Author & {
        mail_address: string,
        is_premium: boolean,
        x_restrict: number,
        is_mail_authorized: boolean,
        require_policy_agreement: boolean
    },
    response: PixivToken
}

/** 通过Web爬虫获取到的数据的相关数据类型 */
export type IllustWeb = {
    id: string,
    title: string,
    description: string,
    createDate: string,
    updateDate: string,
    image_urls: {
        regular: string,
        original: string
    },
    author: {
        id: string,
        name: string
    },
    tags: Array<string>
}