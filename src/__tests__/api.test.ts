import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockGet } = vi.hoisted(() => ({ mockGet: vi.fn() }))

vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: mockGet,
    }),
  },
}))

import { getMarketCoins } from '../services/api'

beforeEach(() => {
  mockGet.mockReset()
})

describe('getMarketCoins', () => {
  it('falls back to mock data on API error', async () => {
    mockGet.mockRejectedValueOnce(new Error('HTTP 429 rate limit'))

    const result = await getMarketCoins('USD')

    expect(result.length).toBeGreaterThan(0)
    expect(result[0].id).toBe('bitcoin')
  })

  it('falls back to mock data on empty response', async () => {
    mockGet.mockResolvedValueOnce({ data: [] })

    const result = await getMarketCoins('USD')

    expect(result[0].id).toBe('bitcoin')
  })

  it('returns API data when available', async () => {
    const coin = { id: 'custom-coin', name: 'Custom Coin' }
    mockGet.mockResolvedValueOnce({ data: [coin] })

    const result = await getMarketCoins('USD')

    expect(result).toEqual([coin])
  })

  it('passes currency in lowercase to the API', async () => {
    mockGet.mockResolvedValueOnce({ data: [{ id: 'bitcoin' }] })

    await getMarketCoins('BRL')

    expect(mockGet).toHaveBeenCalledWith(
      '/coins/markets',
      expect.objectContaining({
        params: expect.objectContaining({ vs_currency: 'brl' }),
      }),
    )
  })
})