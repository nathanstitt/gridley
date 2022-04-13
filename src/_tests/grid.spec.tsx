import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { StrictMode } from 'react'

import { SimpleDemo } from '../../demo/simple-demo'

describe('Simple demo test', () => {
    it('renders', () => {
        render(
            <StrictMode>
                <SimpleDemo />
            </StrictMode>
        )
        screen.getByTestId('Tester')
    })

    it('can force a layout', () => {
        const { container } = render(
            <StrictMode>
                <SimpleDemo forceLayout="mobile" />
            </StrictMode>
        )
        expect(container.querySelector('.gridley')).toHaveClass('mobile')
    })
})
