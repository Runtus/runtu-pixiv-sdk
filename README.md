# pixiv-server-SDK

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

**🌟 一个能够轻松获取Pixiv的插画数据的SDK**

**🌟 An SDK that can easily get Pixiv illustration data."**




## Table of Contents

- [pixiv-server-SDK](#pixiv-server-sdk)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
    - [RPixiv 类](#rpixiv-类)
  - [API](#api)
      - [getDayRanks(range ?: string)](#getdayranksrange--string)
      - [getWeekRanks(range ?: string)](#getweekranksrange--string)
      - [getMonthRanks(range ?: string)](#getmonthranksrange--string)
      - [getAuthorIllusts(id: string, iType: 'illust' | 'manga')](#getauthorillustsid-string-itype-illust--manga)
      - [getAuthorInfo(id: string)](#getauthorinfoid-string)
      - [getPixivStream(url: string, rType: AxiosRequestConfig\['responseType'\])](#getpixivstreamurl-string-rtype-axiosrequestconfigresponsetype)
    - [TODO](#todo)
  - [Maintainers](#maintainers)
  - [License](#license)

## Install

```shell
# npm
npm install runtu-pixiv-sdk
# yarn
yarn add runtu-pixiv-sdk

```

## Usage

### RPixiv 类

* SDK以`RPixiv`类的形式出现，你需要从包中导出类。
* 同时该类可以传递一个`AxiosProxy`参数以便于你使用代理进行Pixiv请求。
* "The SDK appears in the form of the `RPixiv` class, and you need to export the class from the package."
* Additionally, `RPixiv` can receive an param called `AxiosProxy`, allowing you to use a proxy for Pixiv requests.
```typescript
import { RPixiv } from 'runtu-pixiv-sdk'

// 初始化
// init
const pixiv = new RPixiv(proxy)

// token请求, 你必须请求这一步，否则后续会导致一些其他问题
// request token, You must do this step, or this code could not run successfully.
await pixiv.token();

/**
proxy: {
	host: string,
	port: number
}
*/
```

* `AxiosProxy`更多的类型请参考 [AxiosProxy](http://www.axios-js.com/zh-cn/docs/#axios-options-url-config-1)
* `AxiosProxy`: Please refer to [AxiosProxy](http://www.axios-js.com/zh-cn/docs/#axios-options-url-config-1) for more types.



## API
#### getDayRanks(range ?: string)
* 获取Pixiv每日的插画排行榜数据。
* Get Pixiv daily monthly illustration ranking data

```typescript
await pixiv.getDayRanks("2022-11-11")
```

#### getWeekRanks(range ?: string)
* 获取Pixiv每周的插画排行榜数据。
* Get Pixiv weekly illustration ranking data

````typescript
await pixiv.getWeekRanks("2022-11-14")
````



#### getMonthRanks(range ?: string)
* 获取Pixiv每月的插画排行榜数据。
* Get Pixiv weekly monthly ranking data

```typescript
await pixiv.getMonthRanks("2022-11-14")
```

> 后续接口还在移植中

#### getAuthorIllusts(id: string, iType: 'illust' | 'manga')
* 获取Pixiv指定作者的作品，id是作者id号，iType用于指定是漫画作品还是插画作品，默认为漫画作品。
* Get Pixiv author's works, the id is the author's id, and you can set the `iType` to specify the illust or mange, default is the illust.
```typescript
await pixiv.getAuthorIllusts("114514", "manga")
```

#### getAuthorInfo(id: string)
* 获取pixiv指定作者的信息。
* Get Pixiv author's infomation
```ts
await pixiv.getAuthorInfo("1919810")
```

#### getPixivStream(url: string, rType: AxiosRequestConfig['responseType'])
* 获取pixiv图片的数据流，rType用于制定图片流的类型，是`Axios`中的`responseType`类型，具体可参考[axios-config](http://www.axios-js.com/zh-cn/docs/#axios-config)

```ts
await pixiv.getPixivStream("https://114514.pixiv.com", "arraybuffer")
```

### TODO
- [x] 增加获取图片流的接口
- [ ] 对各个图片搜索接口实现翻页功能

## Maintainers

[@Runtus](https://github.com/Runtus)

## License

MIT © 2022 Runtus
