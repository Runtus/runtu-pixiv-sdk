import { describe, it, expect } from 'vitest'
import { RPixiv } from "../src"
import { STATUS_CODE } from '../src/const'


describe("rpixiv init", async () => {
    const rpixiv = new RPixiv({
        host: "127.0.0.1",
        port: 7890
    })

    it("dayRanks", async () => {
        const res = await rpixiv.getDayRanks("");
        expect(res.status).toBe(STATUS_CODE.SUCCESS);
    })
})

