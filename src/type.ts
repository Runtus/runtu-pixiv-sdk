
export * from './request/type'
export * from './routers/type'

// 装饰器函数的第一个参数类型
export type DecortorParamsFn = (token: string, ...params: any[]) => any