export enum RankingMode {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
}

// 作者作品类型： 漫画 | 插画
export type UserIllustsType = 'manga' | 'illust'

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

