import { WebPixivType } from '../request/type'

export type RPixivData = {
    code: 200 | 400,
    data: {
        illusts: WebPixivType['illusts'],
        date?: string
    },
    info: string
}

