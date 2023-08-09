import { describe, it, expect } from 'vitest'
import { getRefreshToken } from './getRefreshToken'

describe('suite', async () => {
    const rs = await getRefreshToken();
    console.log(rs)

    it('serial test', () => {
       expect(0).toBe(0)
    })
})