import { describe, it } from 'vitest'

describe('suite', () => {
    it('serial test',  () => {
        console.log('test')
    })
    it.concurrent('test1', (({expect}) => {expect(3 + 9).toBe(12)}))
})