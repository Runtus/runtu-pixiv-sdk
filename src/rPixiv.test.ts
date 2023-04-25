import { describe, it, expect } from 'vitest'
import { RPixiv } from './'

describe("RPixiv Test", async () => {
    const pixiv = new RPixiv({
        host: "127.0.0.1",
        port: 7890
    })   

    await pixiv.token()

    // it("Rpixiv Test", () => {
    //     console.log(114514)
    //     const obj = new RPixiv({
    //         host: "127.0.0.1",
    //         port: 7890
    //     })   


    //     obj.getDayRanks("").then(res => {
    //         console.log(res.data.illusts)
    //         expect(!!res.data.illusts.length).toBe(true)
    //     })
    // })

    it("Rpixiv author info request test", async (ctx) => {
        const res = await pixiv.getAuthorInfo('15989854')
        console.log(res)
        expect(res.code).toBe(200)

    })
})