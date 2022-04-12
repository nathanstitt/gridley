import * as React from 'react'
import styled from '@emotion/styled'
import invariant from 'tiny-invariant'

import { useGridContextState } from './util'

const HeaderDiv = styled.div({
    display: 'contents',
})

const MissingHeader: React.FC<{ id: string }> = ({ id }) => (
    <span>Missing Renderer for column {id}</span>
)

export const Header = () => {
    const ctx = useGridContextState()

    const columns = React.useMemo(() => {
        if (!ctx?.currentLayout) return []
        const { renderers } = ctx
        return (ctx.currentLayout?.columns || []).map((col) => {
            const header = renderers[col.id]?.header
            invariant(header, `Missing Renderer for column ${col.id}`)
            return header ? (
                React.cloneElement(header, { key: col.id, column: col })
            ) : (
                <MissingHeader id={col.id} key={col.id} />
            )
        })
    }, [ctx])

    return <HeaderDiv className="grid-header">{columns}</HeaderDiv>
}
