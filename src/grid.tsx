import * as React from 'react'
import { CSSObject, cx } from '@emotion/css'
import styled from '@emotion/styled'

import { GridContextProvider } from './types'
import type { Layouts, GridContext } from './types'
import { useCurrentLayoutMatch } from './util'

const Grid = styled.div(({ layoutStyle }: { layoutStyle: CSSObject }) => ({
    display: 'grid',
    '.header, .row': { display: 'contents' },
    ...layoutStyle,
}))

interface GridleyProps<D, L extends Layouts> {
    caption?: React.ReactElement
    className?: string
    data: D[]
    layouts: L
    defaultLayout: keyof L
}

export function Gridley<D, L extends Layouts>(props: React.PropsWithChildren<GridleyProps<D, L>>) {
    const { className, data, children, layouts, defaultLayout, caption } = props
    const currentLayout = useCurrentLayoutMatch<L>(layouts, defaultLayout)

    const context: GridContext<D> = [data, currentLayout[0] as any, currentLayout[1]]

    return (
        <GridContextProvider value={context}>
            {caption && caption}
            <Grid className={cx('gridley', className)} layoutStyle={currentLayout[1].style}>
                {children}
            </Grid>
        </GridContextProvider>
    )
}
