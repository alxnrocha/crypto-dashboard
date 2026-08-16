import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from '../components/ui/Card'

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <span>card content</span>
      </Card>,
    )

    expect(screen.getByText('card content')).toBeInTheDocument()
  })

  it('applies additional className', () => {
    render(
      <Card className="custom-class">
        <span>content</span>
      </Card>,
    )

    expect(screen.getByText('content').closest('div')?.className).toContain(
      'custom-class',
    )
  })
})