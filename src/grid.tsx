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
import { toPX } from './util'

const colTmplStyle = (c: ColumnSpec) => {
    if (c.row !== 1) return ''

    let rule = ''
    if (c.width) {
        rule = toPX(c.width)
    } else if (c.min || c.max) {
        rule = `minmax(${toPX(c.min || 'auto')}, ${toPX(c.max || 'auto')})`
    } else {
        rule = 'auto'
    }
    if (c.colSpan) {
        rule = Array(c.colSpan).fill(rule).join(' ')
    }
    return rule
}

const colStyle = (layout: LayoutSpec, c: ColumnSpec) => {
    let rule: CSSObject = {}
    if (c.colSpan) {
        rule = { ...rule, gridColumn: `auto /span ${c.colSpan}` }
    }
    if (c.rowSpan > 1) {
        rule = { ...rule, gridRow: `auto /span ${c.rowSpan}` }
    }
    if (c.justify) {
        rule = { ...rule, justifyContent: JUSTIFY_CONTENT[c.justify] }
    } // eslint-disable-next-line eqeqeq
    rule['--is-last-row'] = layout.lastRowOffset == c.row + (c.rowSpan - 1) ? 1 : 0
    rule['--row-offset'] = c.row
    return rule
}

const styleForLayout = (layout: LayoutSpec) => {
    const style: CSSObject = {
        display: 'grid',
        '[data-column-id]': { display: 'flex', alignItems: 'center' },
        gridTemplateColumns: layout.columns.map(colTmplStyle).join(' '),
    }
    if (layout.cellPadding !== false) {
        style['.grid-row, .grid-header'] = {
            '> *:not(:empty)': {
                padding: toPX(layout.cellPadding),
                '&:not(:last-child)': {
                    paddingRight: 0,
                },
            },
        }
    }
    style['--last-row-offset'] = layout.lastRowOffset
    if (layout.stripe !== false) {
        style['.grid-row:nth-of-type(2n) > *'] = {
            backgroundColor: typeof layout.stripe === 'string' ? layout.stripe : '#e8e8e8',
        }
    }
    const columnStyles = layout.columns.reduce(
        (css, c) => ({ ...css, [`[data-column-id="${c.id}"]`]: colStyle(layout, c) }),
        {}
    )
    return deepmerge.all([style, columnStyles, layout.style || {}]) as CSSObject
}

const Grid = styled.div(({ layoutStyles }: { layoutStyles: CSSObject }) => layoutStyles)

export interface GridleyProps<Data extends any[]>
    extends GridContextProps,
        React.HTMLAttributes<HTMLDivElement> {
    caption?: React.ReactElement
    className?: string
    data: Data
}

export function Gridley<Data extends any[]>(props: React.PropsWithChildren<GridleyProps<Data>>) {
    const { className, data, children, caption, ...gridProps } = props

    const context = useGridContextProvider(props)

    const style = React.useMemo<CSSObject>(
        () => styleForLayout(context.state.currentLayout || { style: {}, columns: [] }),
        [context.state.currentLayout]
    )

    return (
        <GridContextProvider value={context}>
            {caption && caption}
            <Grid
                role="table"
                className={cx('gridley', className, context.state.layoutId)}
                layoutStyles={style}
                {...gridProps}
            >
                <Header />
                <Body data={data} />
                {children}
            </Grid>
        </GridContextProvider>
    )
}
