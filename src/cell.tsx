import * as React from 'react'
import { cx } from '@emotion/css'
import get from 'lodash.get'

type CellRenderer = (
    data: any,
    args: {
        key: string
        rowData: any[] | Record<string, any>
        allData: any[]
    }
) => React.ReactNode

export interface CellProps {
    id: string
    className?: string
    Component?: React.FunctionComponent<any> | React.ComponentClass<any>
    render?: CellRenderer
}

export const Cell: React.FC<CellProps> = ({
    id,
    className,
    children,
    render,
    Component,
    ...props
}) => {
    const rd = props as any
    let content = children || get(rd.data, id)
    if (render) {
        content = render(rd.data, rd)
    } else if (Component) {
        content = <Component {...props} />
    }
    return <div className={cx('cell', id, className)}>{content}</div>
}
