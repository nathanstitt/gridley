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
import { JUSTIFY_CONTENT, } from './types'
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
    if (c.justify) {
        rule = { ...rule, justifyContent: JUSTIFY_CONTENT[c.justify] }
    }
    return rule
}

const Grid = styled.div(({ layout }: { layout: LayoutSpec }) => {
    const style: CSSObject = {
        display: 'grid',
        '[data-column-id]': { display: 'flex', alignItems: 'center' },
        gridTemplateColumns: layout.columns.map(colTmplStyle).join(' '),
        ...layout.columns.reduce(
            (css, c) => ({ ...css, [`[data-column-id="${c.id}"]`]: colStyle(c) }),
            {}
        ),
        ...layout.style,
    }
    if (layout.stripe) {
        style['.grid-row:nth-of-type(2n) > *'] = {
            backgroundColor: layout.stripe === true ? '#e8e8e8' : layout.stripe,
        }
    }
    console.log(style)
    return style
})

interface GridleyProps<Data extends any[]> extends GridContextProps {
    caption?: React.ReactElement
    className?: string
    data: Data
}

export function Gridley<Data extends any[]>(props: React.PropsWithChildren<GridleyProps<Data>>) {
    const { className, data, children, caption, defaultLayout, forceLayout } = props

    const context = useGridContextProvider(defaultLayout, forceLayout)

    React.useEffect(() => {
        console.log('props ch')
    }, [defaultLayout, forceLayout])

    const layout = React.useMemo(() => {
        console.log('recomput la')
        return context.state.currentLayout || { style: {}, columns: [] }
    }, [context])

    return (
        <GridContextProvider value={context}>
            {caption && caption}
            <Grid className={cx('gridley', className)} layout={layout}>
                <Header />
                <Body data={data} />
                {children}
            </Grid>
        </GridContextProvider>
    )
}
