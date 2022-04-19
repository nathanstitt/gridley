import * as React from 'react'
import { cx } from '@emotion/css'

import { ColumnSpec, LayoutSpec } from './types'

type CellRenderer<D, R, A> = (data: D, row: R, allData: A) => React.ReactNode

export interface CellProps {
    id?: string
    column?: ColumnSpec
    hidden?: boolean
    className?: string
    Component?: React.FunctionComponent<any> | React.ComponentClass<any>
    render?: CellRenderer<any>
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
    const rd = props as { value: any; rowData: any; allData: any }

    if (render) {
        content = render(rd.value, rd.rowData, rd.allData, { ...props })
    } else if (Component) {
        content = <Component value={rd.value} {...props} />
    } else {
        content = children || rd.value
    }

    return (
        <div data-column-id={column?.id} className={cx('grid-cell', id, column?.id, className)}>
            {content}
        </div>
    )
}
