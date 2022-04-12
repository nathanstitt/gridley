import * as React from 'react'
import { cx } from '@emotion/css'

import { ColumnSpec } from './types'

type CellRenderer = (
    data: any,
    args: {
        key: string
        rowData: any[] | Record<string, any>
        allData: any[]
    }
) => React.ReactNode

export interface CellProps extends BoxProps {
    id?: string
    column?: ColumnSpec
    hidden?: boolean
    className?: string
    Component?: React.FunctionComponent<any> | React.ComponentClass<any>
    render?: CellRenderer
}

export const Cell: React.FC<CellProps> = ({
    id,
    column,
    className,
    children,
    render,
    hidden,
    Component,
    ...props
}) => {
    if (hidden) return null

    let content: any = ''
    const rd = props as any
    const value = rd.value
    if (render) {
        content = render(value, props as any)
    } else if (Component) {
        content = <Component value={value} {...props} />
    } else {
        content = children || value
    }
    return (
        <div
            data-column-id={column?.id}
            className={cx('grid-cell', id, column?.id, className)}
        >
            {content}
        </div>
    )
}
