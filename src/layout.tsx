import * as React from 'react'
import type { CSSObject } from '@emotion/css'

import { useGridContextDispatch } from './util'
import { ColumnSpec, LayoutSpec } from './types'

interface LayoutProps extends Omit<LayoutSpec, 'columns'> {
    children: React.ReactNode[]
}

export function Layout({ children, ...layout }: React.PropsWithChildren<LayoutProps>) {
    const dispatch = useGridContextDispatch()

    React.useEffect(() => {
        if (!dispatch) return

        const columns: ColumnSpec[] = React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                return child.props as any as ColumnSpec
            }
        }).filter(Boolean)

        dispatch({ type: 'ADD_LAYOUT', layout: { ...layout, columns } })
    }, [dispatch])

    return null

    /* if (id !== ctx?.layoutId) {
     *     return null
     * } */

    /* React.useEffect(() => {

     *     ctx?.setColumns(React.Children.map(children, (child) => {
     *         if (!React.isValidElement(child)) { return false }
     *         return child.props as any as ColumnSpec
     *     }).filter(Boolean))
     * }, [ctx])
     * return null */
}
