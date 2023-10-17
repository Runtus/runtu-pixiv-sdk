import { describe, it, expect } from 'vitest'
import { RPixiv } from './'

describe("RPixiv Test", async () => {
    const pixiv = new RPixiv({
        host: "127.0.0.1",
        port: 7890
    })   

    await pixiv.token()

    it("Search Illust By Id", async (ctx) => {
        const res = await pixiv.searchIllustsById("");
        console.log("res", res);
        expect(res.status).toBe(200);
    })



    // it("Author Info Test", async (ctx) => {
    //     const res = await pixiv.getAuthorInfo('15989854')
    //     expect(res.user.id).toBe(15989854)
    // })

    // it("Pixiv Illust Test", async (ctx) => {
    //     const stream = await pixiv.getPixivStream("https://i.pximg.net/c/1200x600_90_a2_g5/background/img/2022/08/27/21/22/17/15989854_46f84d1f9fd8c74fc7e0222db46028ef_master1200.jpg", "arraybuffer")
    //     console.log(stream)
    //     expect(200).toBe(200)
    // }
})