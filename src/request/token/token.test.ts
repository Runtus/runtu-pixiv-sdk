import { describe, it, expect } from 'vitest'
import { getRefreshToken } from './getRefreshToken'
import { getAccessToken } from './getAccessToken'

const refreshToken ="ai3ox2_na-XIKx94aokPxohSpiC3paTBPXnIWfepj0A"

// describe('suite', async () => {
    

//     // it('serial test', async () => {
//     //     const rs = await getRefreshToken();
//     //     console.log(rs)
//     //     expect(0).toBe(0)
//     // })
// })


describe("accessToken", async () => {
    it("getAccesstoken", async () => {
        const access = await getAccessToken(refreshToken);
        expect(access.status).toBe(200)
    }) 
})

describe("refreshtoken", async () => {
    it("getRefreshToken", async () => {
        const refresh = await getRefreshToken();
        expect(refresh.status).toBe(200)
    })
})