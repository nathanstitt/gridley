import * as React from 'react'

import { useGridContextDispatch } from './util'
import { ColumnSpec, LayoutSpec, HeaderSeparator } from './types'

interface LayoutProps extends Omit<LayoutSpec, 'columns' | 'lastRowOffset' | 'headerSeparator'> {
    children: React.ReactNode | React.ReactNode[]
    headerSeparator?: HeaderSeparator
}

const LAYOUT_DEFAULTS = {
    lastRowOffset: 1,
    headerSeparator: {
        width: '1px',
        color: 'black',
        style: 'solid',
    } as HeaderSeparator,
}

const COLUMN_DEFAULTS = {
    rowSpan: 1,
    row: 1,
}

export function Layout({ children, ...layoutProps }: LayoutProps): null {
    const dispatch = useGridContextDispatch()

    React.useEffect(() => {
        if (!dispatch) return

        const columns =
            React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return { ...COLUMN_DEFAULTS, ...child.props } as ColumnSpec
                }
                return false
            })?.filter(Boolean) || []

        const layout = { ...LAYOUT_DEFAULTS, ...layoutProps, columns } as LayoutSpec
        layout.lastRowOffset = layout.columns.reduce((max, c) => (c.row > max ? c.row : max), 0)
        dispatch({ type: 'ADD_LAYOUT', layout })
    }, [dispatch, children, layoutProps])

    return null
}
