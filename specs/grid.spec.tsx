import * as React from 'react'
import { expect, describe, it, beforeEach } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers);
import { render, screen, cleanup } from '@testing-library/react'

import { StrictMode } from 'react'

import Demo from '../demo/demo'

describe('grid test', () => {

    beforeEach(cleanup)

    it('renders', () => {
        render(
            <StrictMode>
                <Demo />
            </StrictMode>
        )
        screen.getByTestId('Tester')
    })

    it('can force a layout', () => {
        const { container } = render(
            <StrictMode>
                <Demo forceLayout="mobile" />
            </StrictMode>
        )
        expect(container.querySelector('.gridley')).toHaveClass('mobile')
    })

    it('can render arrays', () => {
        const { container } = render(<Demo />)
        expect(container.querySelector('.gridley')).toHaveClass('mobile')
    })
})
