import * as React from 'react'
import { cx } from '@emotion/css'
import styled from '@emotion/styled'
import get from 'lodash.get'

import { useGridContextState } from './util'


interface BodyProps<Data extends any[]> {
    data: Data
}

export function Body<Data extends any[]>({ data }: BodyProps<Data>) {
    const ctx = useGridContextState()

    const rows = React.useMemo(() => {
        if (!ctx || !ctx.currentLayout) return []
        const { renderers, currentLayout: layout } = ctx
        const columns = layout.columns || []
        return data.map((rowData: any, i: number) => {
            let rowAttrs: React.HTMLAttributes<HTMLDivElement> = {}
            if (ctx.props.rowAttributes) {
                if (typeof ctx.props.rowAttributes === 'function') {
                    rowAttrs = ctx.props.rowAttributes(rowData, layout)
                } else {
                    rowAttrs = ctx.props.rowAttributes
                }
            }

            return (
                <div
                    role="row"
                    key={i}
                    {...rowAttrs}
                    className={cx('grid-row', rowAttrs.className)}
                >
                    {columns.map((col) => {
                        const r = renderers[col.id]
                        if (!r) throw new Error(`Missing renderer for column ${col.id}`)

                        const { body: cell, dataPath } = r
                        if (!cell) return <span>missing column {col.id}</span>

                        return React.cloneElement(cell, {
                            id: col.id,
                            key: col.id,
                            data,
                            rowData,
                            role: 'cell',
                            layout,
                            column: col,
                            value: get(rowData, dataPath || col.id),
                        })
                    })}
                </div>
            )
        })
    }, [ctx, data])

    return <div className="grid-body">{rows}</div>
}
