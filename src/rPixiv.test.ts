import { describe, it, expect } from 'vitest'
import { RPixiv } from './'

describe("RPixiv Test", () => {
    console.log("Hello Hello")
    it("Rpixiv Test", () => {
        console.log(114514)
        const obj = new RPixiv({
            host: "127.0.0.1",
            port: 7890
        })   


        obj.getDayRanks("").then(res => {
            console.log(res.data.illusts)
            expect(!!res.data.illusts.length).toBe(true)
        })
    })
})