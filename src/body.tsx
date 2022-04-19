import * as React from 'react'
import { cx } from '@emotion/css'
import styled from '@emotion/styled'
import get from 'lodash.get'
import invariant from 'tiny-invariant'

import { useGridContextState } from './util'

const BodyDiv = styled.div({
    display: 'contents',
})

const RowDiv = styled.div({
    display: 'contents',
})

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
            let rowAttrs: HTMLAttributes<div> = {}
            if (ctx.props.rowAttributes) {
                if (typeof ctx.props.rowAttributes === 'function') {
                    rowAttrs = ctx.props.rowAttributes(rowData, layout)
                } else {
                    rowAttrs = ctx.props.rowAttributes
                }
            }
//        console.log(ctx.props.rowAttributes, rowAttrs)
            return (
                <RowDiv key={i} {...rowAttrs} className={cx('grid-row', rowAttrs.className)}>
                    {columns.map((col) => {
                        const r = renderers[col.id]
                        invariant(r, `Missing renderer for column ${col.id}`)
                        const { body: cell, dataPath } = r
                        if (!cell) return <span>missing column {col.id}</span>

                        return React.cloneElement(cell, {
                            key: col.id,
                            data,
                            rowData,
                            layout,
                            column: col,
                            value: get(rowData, dataPath || col.id),
                        })
                    })}
                </RowDiv>
            )
        })
    }, [ctx, data])

    return <BodyDiv className="grid-body">{rows}</BodyDiv>
}
