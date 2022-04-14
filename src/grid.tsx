import * as React from 'react'
import type { CSSObject } from '@emotion/react'
import { cx } from '@emotion/css'
import styled from '@emotion/styled'
import deepmerge from 'deepmerge'

import { useGridContextProvider } from './store'
import { Body } from './body'
import { Header } from './header'
import { ColumnSpec, GridContextProvider, JUSTIFY_CONTENT } from './types'
import type { GridContextProps, LayoutSpec } from './types'
import { defaultToPx } from './util'

const colTmplStyle = (c: ColumnSpec) => {
    let rule = c.wrap ? '' : 'auto'
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
    if (c.justify) {
        rule = { ...rule, justifyContent: JUSTIFY_CONTENT[c.justify] }
    }
    rule['--row-offset'] = defaultToPx(c.wrap || 0)
    return rule
}

const styleForLayout = (layout: LayoutSpec) => {
    const style: CSSObject = {
        display: 'grid',
        '[data-column-id]': { display: 'flex', alignItems: 'center' },
        gridTemplateColumns: layout.columns.map(colTmplStyle).join(' '),
    }
    if (layout.stripe !== false) {
        style['.grid-row:nth-of-type(2n) > *'] = {
            backgroundColor: typeof layout.stripe === 'string' ? layout.stripe : '#e8e8e8',
        }
    }
    const columnStyles = layout.columns.reduce(
        (css, c) => ({ ...css, [`[data-column-id="${c.id}"]`]: colStyle(c) }),
        {}
    )
    return deepmerge.all([style, columnStyles, layout.style || {}]) as CSSObject
}

const Grid = styled.div(({ layoutStyles }: { layoutStyles: CSSObject }) => layoutStyles)

export interface GridleyProps<Data extends any[]> extends GridContextProps {
    caption?: React.ReactElement
    className?: string
    data: Data
}

export function Gridley<Data extends any[]>(props: React.PropsWithChildren<GridleyProps<Data>>) {
    const { className, data, children, caption, defaultLayout, forceLayout } = props

    const context = useGridContextProvider(defaultLayout, forceLayout)

    const style = React.useMemo<CSSObject>(
        () => styleForLayout(context.state.currentLayout || { style: {}, columns: [] }),
        [context.state.currentLayout]
    )

    return (
        <GridContextProvider value={context}>
            {caption && caption}
            <Grid className={cx('gridley', className, context.state.layoutId)} layoutStyles={style}>
                <Header />
                <Body data={data} />
                {children}
            </Grid>
        </GridContextProvider>
    )
}
