# pixiv-server

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

**🌟 一个能够轻松获取Pixiv的各个接口数据的项目**


## Table of Contents

- [pixiv-server](#pixiv-server)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
      - [代理(Proxy)](#代理proxy)
  - [API](#api)
      - [/ranks/[day/week/month]](#ranksdayweekmonth)
      - [/illusts/search](#illustssearch)
      - [/user/detail](#userdetail)
      - [/user/illusts](#userillusts)
  - [Maintainers](#maintainers)
  - [License](#license)

## Install

```shell
# npm
npm install
# yarn
yarn


# If you need run this project on service, you should install pm2
npm install pm2 -g
# or
yarn global add pm2

```

## Usage

#### 代理(Proxy)
* 如果你在中国大陆境内，则需要提供科学上网工具才能成功获取到Pixiv接口数据。本项目已提供了代理接口，你之需要在`config.pixiv.ts`文件中填入相应配置即可。
* If you in Chinese, you need find some methods to avoid the GFW. This project have proviced the **Proxy Intreface**, you just need input your configuration in file `config.pixiv.ts`.
```ts
// config.pixiv.ts
export default {
    proxy: {
        /**
         * defalut: {
         *      url: "http://127.0.0.1",
         *      port: 7890
         * }
         */
        status: true , // or false
        host: 'your host',  // string
        port: 'your port',  // number
    },
}
```

* 如下代码是项目启动命令
* start command
```shell
# Development
yarn start

# Production
yarn service
```

## API
#### /ranks/[day/week/month]
* 获取Pixiv每日/每周/每月的插画排行榜数据。
* Get Pixiv daily/weekly/monthly illustration ranking data

#### /illusts/search
* 搜索Pixiv插画
* Search Pixiv illustration

```ts
// Query 
type Query = {
    keyword: string // 关键词 (keywords)
}
```

#### /user/detail
* 获取用户/画师的基本信息
* get user infomation (such as name, twitter account and so on)

```ts
type Query = {
    id: string // 用户id (user id)
}
```

#### /user/illusts
* 获取用户/画师的插画
* get user illustration

```ts
type Query = {
    id: string, // 用户id (user id)
    type: 'illust' | 'manga' // 插画作品 / 漫画作品 (illustration works / comic wokrs)
}
```

## Maintainers

[@Runtus](https://github.com/Runtus)

## License

MIT © 2022 Runtus
