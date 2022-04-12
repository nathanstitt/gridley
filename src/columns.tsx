import * as React from 'react'

import { useGridContextDispatch } from './util'
import { ColumnSpec, Renderers } from './types'

interface ColumnsProps {
    children: React.ReactElement<ColumnSpec>[]
}

export function Columns({ children }: ColumnsProps) {
    const dispatch = useGridContextDispatch()

    React.useEffect(() => {
        if (!dispatch) return
        const renderers: Renderers = {}
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child)) {
                const col = child.props as ColumnSpec

                renderers[col.id] = col
            }
        })
        dispatch({ type: 'SET_RENDERERS', renderers: renderers })
    }, [dispatch, children])

    return null
}
