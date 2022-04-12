import * as React from 'react'
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
        const { renderers } = ctx
        const columns = ctx.currentLayout?.columns || []

        return data.map((rowData: any, i: number) => {
            return (
                <RowDiv className="grid-row" key={i}>
                    {columns.map((col) => {
                        const r = renderers[col.id]
                        invariant(r, `Missing renderer for column ${col.id}`)
                        const { body: cell, dataPath } = r
                        if (!cell) return <span>missing column {col.id}</span>

                        return React.cloneElement(cell, {
                            key: col.id,
                            data,
                            rowData,
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
