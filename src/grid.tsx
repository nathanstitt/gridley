import * as React from 'react'
import { CSSObject, cx } from '@emotion/css'
import styled from '@emotion/styled'

import { useGridContextProvider } from './store'
import { Body } from './body'
import { Header } from './header'
import { ColumnSpec, GridContextProvider } from './types'
import type {
    Layouts,
    GridContextState,
    GridContextProps,
    DispatchAction,
    LayoutSpec,
} from './types'
import { useCurrentLayoutMatch, defaultToPx } from './util'

const colTmplStyle = (c: ColumnSpec) => {
    let rule = c.colSpan === 0 ? '' : 'auto'
    if (c.width) {
        rule = defaultToPx(c.width)
    } else if (c.min || c.max) {
        rule = `minmax(${defaultToPx(c.min || 'auto')}, ${defaultToPx(c.max || 'auto')})`
    }

    if (c.colSpan) {
        rule = Array(c.colSpan).fill(rule).join(' ')
    }
    return rule
}

const colStyle = (c: ColumnSpec) => {
    let rule: CSSObject = {}
    if (c.colSpan) {
        rule = { ...rule, gridColumn: `auto /span ${c.colSpan}` }
    }
    if (c.rowSpan) {
        rule = { ...rule, gridRow: `auto /span ${c.rowSpan}`, color: 'blue' }
    }
    return rule
}
// ...layout.columns.reduce((css, c) => ({ ...css, ['.grid.cell.${c.id}']: columnStyle(c) }), {}),

const Grid = styled.div(({ layout }: { layout: LayoutSpec }) => {

    const style = {
        display: 'grid',
        gridTemplateColumns: layout.columns.map(colTmplStyle).join(' '),
        ...layout.columns.reduce((css, c) => ({ ...css, [`[data-column-id="${c.id}"]`]: colStyle(c) }), {}),
        ...layout.style,
    }
    console.log(style)
    return style
})

interface GridleyProps<D> extends GridContextProps {
    caption?: React.ReactElement
    className?: string
    data: D[]
}

export function Gridley<D>(props: React.PropsWithChildren<GridleyProps<D>>) {
    const { className, data, children, caption } = props

    const context = useGridContextProvider(data, props)

    return (
        <GridContextProvider value={context}>
            {caption && caption}
            <Grid
                className={cx('gridley', className)}
                layout={context.state.currentLayout || { style: {}, columns: [] }}
            >
                <Header />
                <Body />
                {children}
            </Grid>
        </GridContextProvider>
    )
}
