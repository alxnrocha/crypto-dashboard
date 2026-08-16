import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../components/ui/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)

    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Go</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Go' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders disabled state', () => {
    render(<Button disabled>Go</Button>)

    expect(screen.getByRole('button', { name: 'Go' })).toBeDisabled()
  })

  it('applies the default primary variant', () => {
    render(<Button>Go</Button>)

    expect(screen.getByRole('button', { name: 'Go' }).className).toContain(
      'bg-blue-600',
    )
  })
})