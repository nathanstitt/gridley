import * as React from 'react'
import { render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { SimpleDemo } from '../../demo/simple-demo'

function setUpApp() {
    render(
        <StrictMode>
            <SimpleDemo />
        </StrictMode>
    )
}

describe('Simple demo test', () => {
    it('renders', () => {
        setUpApp()
        screen.getByTestId('Tester McTesty')
        const rows = screen.getAllByTestId(/^id-*/)
        expect(rows).toHaveLength(30)
    })
})
