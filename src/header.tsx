import * as React from 'react'
import { cx } from '@emotion/css'
import { css }  from '@emotion/css'
import type { LayoutSpec, StickySpec } from './types'
import { useGridContextState, toPX } from './util'

function stickyStyle(sticky?: StickySpec) {
    if (!sticky) return undefined
    return css({
        position: 'sticky',
        boxSizing: 'border-box',
        background: sticky.background,
        top: `calc(((var(--row-offset) - 1) * ${toPX(sticky.rowHeight)}) + ${toPX(sticky.top)})`,
        minHeight: toPX(sticky.rowHeight),
    })
}

function headerStyle(layout?: LayoutSpec) {
    return css({
        '> *': {
            zIndex: 'calc(var(--last-row-offset) - var(--row-offset) + 2)',
            borderBottomColor: layout?.headerSeparator.color,
            borderBottomStyle: layout?.headerSeparator.style,
            borderBottomWidth: `calc(${toPX(layout?.headerSeparator.width)} * var(--is-last-row))`,
        }
    })
}

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
            if (!header) throw new Error(`Missing Renderer for header column ${col.id}`)

            return header ? (
                React.cloneElement(header, {
                    role: 'columnheader',
                    key: col.id,
                    id: col.id,
                    column: col,
                })
            ) : (
                <MissingHeader id={col.id} key={col.id} />
            )
        })
    }, [ctx])

    const divCss = React.useMemo(() => headerStyle(ctx?.currentLayout), [ctx?.currentLayout])
    const stickyCss = React.useMemo(
        () => stickyStyle(ctx?.currentLayout?.stickyHeader),
        [ctx?.currentLayout?.stickyHeader]
    )

    return (
        <div role="rowheader" className={cx('grid-header', divCss, stickyCss)}>
            {columns}
        </div>
    )
}
