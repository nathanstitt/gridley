import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { StrictMode } from 'react'

import Demo from '../../demo/demo'

describe('grid test', () => {
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
