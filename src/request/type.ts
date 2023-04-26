export enum RankingMode {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
}

// 作者作品类型： 漫画 | 插画
export type UserIllustsType = 'manga' | 'illust';

export type WebPixivType = {
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

export type PixivPic = {
    title: string;
    id: string;
    url: string;
    author: string;
};

export type Author = {
    id: string;
    name: string;
    accrount: string;
    profile_image_urls: {
        medium?: string;
    };
    is_followed: boolean;
    is_access_blocking_user: boolean;
};

export type AuthorIllusts = {
    user: Author;
} & WebPixivType;

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