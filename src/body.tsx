import * as React from 'react'
import styled from '@emotion/styled'
import { cx } from '@emotion/css'

import { GridAreaContextProvider } from './types'

const BodyDiv = styled.div({
    display: 'contents',
})

interface BodyProps {
    className?: string
    children: React.ReactNode // (props: { foo: string }) => string
}

export const Body: React.FC<BodyProps> = ({ className, children }) => {
    /* const ctx = React.useContext<GridContext<D>>(gridContext)
     * const data = ctx[0] */

    return (
        <GridAreaContextProvider value={'body'}>
            <BodyDiv className={cx('body', className)}>{children}</BodyDiv>
        </GridAreaContextProvider>
    )
}
