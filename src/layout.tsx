import * as React from 'react'

import { useGridContextDispatch } from './util'
import { ColumnSpec, LayoutSpec } from './types'

interface LayoutProps extends Omit<LayoutSpec, 'columns'> {
    children: React.ReactNode[]
}

export function Layout({ children, ...layout }: LayoutProps) {
    const dispatch = useGridContextDispatch()

    React.useEffect(() => {
        if (!dispatch) return

        const columns =
            React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return child.props as any as ColumnSpec
                }
                return false
            })?.filter(Boolean) || []

        dispatch({ type: 'ADD_LAYOUT', layout: { ...layout, columns } })
    }, [dispatch, children, layout])

    return null
}
