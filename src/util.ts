import * as React from 'react'

import { GridContext, Layouts, gridContext, LayoutSpec, gridAreaContext } from './types'

export const defaultToPx = (v: string | number) => (typeof v == 'string' ? v : `${v}px`)

export function debounce(func: () => void, timeout = 100) {
    let timer: any
    return () => {
        clearTimeout(timer)
        timer = window.setTimeout(func, timeout)
    }
}

export function useCurrentLayoutMatch<T extends Layouts>(
    layouts: T,
    defaultLayout: keyof T
): [keyof T, LayoutSpec] {
    const findMatch = React.useCallback(
        () =>
            Object.keys(layouts).find((layoutId) => {
            const { min, max } = layouts[layoutId]! // eslint-disable-line
                const query = window.matchMedia?.(
                    `(min-width: ${defaultToPx(min)}) and (max-width: ${defaultToPx(max)})`
                )
                return query?.matches
            }),
        [layouts]
    )

    const [layout, setLayout] = React.useState<keyof T | 'default'>(findMatch() || 'default')

    React.useEffect(() => {
        const listener = debounce(() => {
            const found = findMatch()
            if (found) {
                setLayout(found)
            } else {
                setLayout('default')
            }
        })
        window.addEventListener('resize', listener)
        return () => window.removeEventListener('resize', listener)
    }, [findMatch])

    if (layout === 'default') {
        return [defaultLayout, layouts[defaultLayout] as LayoutSpec]
    }
    return [layout, layouts[layout] as LayoutSpec]
}

export function useCurrentLayout() {
    return
}

export const useIsLayoutActive = (layout?: string) => {
    const ctx = React.useContext(gridContext)

    if (!ctx) return false
    return ctx && (layout == null || layout === ctx[1])
}

export function useGridData<T = any>() {
    const ctx = React.useContext<GridContext<T> | null>(gridContext)
    return ctx ? ctx[0] : []
}

export const useIsInsideGridArea = (area: string) => {
    return React.useContext(gridAreaContext) === area
}
