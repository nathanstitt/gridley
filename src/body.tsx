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

const MissingCell: React.FC<{ id: string }> = ({ id }) => (
    <span>Missing Renderer for column {id}</span>
)

export const Body = () => {
    const ctx = useGridContextState()

    const rows = React.useMemo(() => {
        if (!ctx?.currentLayout) return []
        const { renderers, data } = ctx
        const columns = ctx.currentLayout?.columns || []

        return data.map((rowData: any, i: number) => {
            return (
                <RowDiv className="grid-row" key={i}>
                    {columns.map((col) => {
                        const r = renderers[col.id]
                        invariant(r, `Missing Renderer for column {col.id}`)
                        const { body: cell, dataPath } = r

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
    }, [ctx])

    return <BodyDiv className="grid-body">{rows}</BodyDiv>
}
