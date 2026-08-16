import { beforeEach, describe, expect, it } from 'vitest'

import { useStore } from '../store/useStore'

beforeEach(() => {
  useStore.setState({
    currency: 'USD',
    favorites: [],
    searchQuery: '',
    isMobileMenuOpen: false,
  })
})

describe('useStore', () => {
  it('has USD as default currency', () => {
    expect(useStore.getState().currency).toBe('USD')
  })

  it('updates currency', () => {
    useStore.getState().setCurrency('BRL')

    expect(useStore.getState().currency).toBe('BRL')
  })

  it('toggles favorites on and off', () => {
    const { toggleFavorite } = useStore.getState()

    toggleFavorite('bitcoin')
    expect(useStore.getState().favorites).toContain('bitcoin')

    toggleFavorite('bitcoin')
    expect(useStore.getState().favorites).not.toContain('bitcoin')
  })

  it('keeps multiple favorites', () => {
    const { toggleFavorite } = useStore.getState()

    toggleFavorite('bitcoin')
    toggleFavorite('ethereum')

    expect(useStore.getState().favorites).toEqual(['bitcoin', 'ethereum'])
  })

  it('updates search query', () => {
    useStore.getState().setSearchQuery('solana')

    expect(useStore.getState().searchQuery).toBe('solana')
  })

  it('toggles mobile menu open state', () => {
    const { setMobileMenuOpen } = useStore.getState()

    setMobileMenuOpen(true)
    expect(useStore.getState().isMobileMenuOpen).toBe(true)

    setMobileMenuOpen(false)
    expect(useStore.getState().isMobileMenuOpen).toBe(false)
  })
})