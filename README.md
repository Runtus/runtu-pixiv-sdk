# pixiv-server

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

**🌟 一个能够轻松获取Pixiv的各个接口数据的项目**


## Table of Contents

- [pixiv-server](#pixiv-server)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
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

```shell
# Development
yarn start

# Production
yarn service
```

## API
#### /ranks/[day/week/month]
* 获取Pixiv每日/每周/每月的插画排行榜数据。

#### /illusts/search
* 搜索Pixiv插画
```ts
// Query 
type Query = {
    keyword: string // 关键词
}
```

#### /user/detail
* 获取用户/画师的基本信息
```ts
type Query = {
    id: string // 用户id
}
```

#### /user/illusts
```ts
type Query = {
    id: string, // 用户id
    type: 'illust' | 'manga' // 插画作品 / 漫画作品
}
```

## Maintainers

[@Runtus](https://github.com/Runtus)

## License

MIT © 2022 Runtus
