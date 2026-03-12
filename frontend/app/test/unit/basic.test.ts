import { describe, expect, it } from 'vitest'

const sum = (a: number, b: number) => a + b

describe('sum', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(1, 2)).toBe(3)
    })
    it('should return a negative number if the sum is negative', () => {
        expect(sum(-1, -2)).toBe(-3)
    })
})