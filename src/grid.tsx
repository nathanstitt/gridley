import * as React from 'react'
import { css, cx } from '@emotion/css'
import type { CSSObject } from '@emotion/react'
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

export const Selectors = {
    wrappers: '> .grid-header, > .grid-body, .grid-body > .grid-row',
    nonEmpty: '*:not(:empty)',
    header: '.grid-header',
    body: '.grid-body',
    row: '.grid-row',
}

const styleForLayout = (layout: LayoutSpec) => {
    const pad = toPX(layout.cellPadding)
    const columnStyles: Record<string, CSSObject> = {}
    for (const c of layout.columns) {
        columnStyles[`> [data-column-id="${c.id}"]`] = {
            '--row-offset': c.row,
            '--is-last-row': layout.lastRowOffset === c.row + (c.rowSpan - 1) ? 1 : 0,
            gridColumn: `auto /span ${c.colSpan || 1}`,
            gridRow: `auto /span ${c.rowSpan || 1}`,
            justifyContent: JUSTIFY_CONTENT[c.justify || 'start'],
        }
    }
    const styles: CSSObject = {
        display: 'grid',
        gridTemplateColumns: layout.columns.map(colTmplStyle).join(' '),
        '--last-row-offset': layout.lastRowOffset,
        [`${Selectors.wrappers}`]: {
            display: 'contents',
            '>[data-column-id]': { display: 'flex', alignItems: 'center' },
            [`>${Selectors.nonEmpty}`]:
                layout.cellPadding === false
                    ? undefined
                    : {
                          padding: `${pad} calc(${pad} / 2)`,
                      },
        },
        [`> ${Selectors.header}`]: columnStyles,
        [`> ${Selectors.body}`]: {
            [` > ${Selectors.row}`]: {
                '&:nth-of-type(2n + 1) > *':
                    layout.stripe === false
                        ? undefined
                        : {
                              backgroundColor:
                                  typeof layout.stripe === 'string' ? layout.stripe : '#e8e8e8',
                          },
                ...columnStyles,
            },
        },
        ...layout.style,
    }

    return styles
}

export interface GridleyProps<Data extends any[]>
    extends GridContextProps,
        React.HTMLAttributes<HTMLDivElement> {
    caption?: React.ReactElement
    className?: string
    data: Data
}

export function Gridley<Data extends any[]>(props: React.PropsWithChildren<GridleyProps<Data>>) {
    const {
        'data-testid': testid, className, data, children, caption, ...gridProps
    } = props

    const context = useGridContextProvider(props)

    const styles = React.useMemo(
        () => css(styleForLayout(context.state.currentLayout || { style: {}, columns: [] })),
        [context.state.currentLayout]
    )

    return (
        <GridContextProvider value={context}>
            {caption && caption}
            <div
                role="table"
                data-testid={testid}
                className={cx('gridley', styles, className, context.state.layoutId)}
            >
                <Header />
                <Body data={data} />
                {children}
            </div>
        </GridContextProvider>
    )
}
