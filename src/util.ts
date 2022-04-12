import * as React from 'react'

import { gridContext, LayoutSpec, GridContext } from './types'

export const defaultToPx = (v: string | number) => (typeof v == 'string' ? v : `${v}px`)

export function debounce(func: () => void, timeout = 100) {
    let timer: any
    return () => {
        clearTimeout(timer)
        timer = window.setTimeout(func, timeout)
    }
}

export function useCurrentLayoutMatch<L extends Record<string, LayoutSpec>>(
    layouts: L,
    defaultLayout?: string,
    forceLayout?: string
): [string, LayoutSpec] {
    const findMatch = React.useCallback(() => {
        if (forceLayout) return null

        return Object.keys(layouts).find((layoutId) => {
            const { min, max } = layouts[layoutId]! // eslint-disable-line
            const query = window.matchMedia?.(
                `(min-width: ${defaultToPx(min)}) and (max-width: ${defaultToPx(max)})`
            )
            return query?.matches
        })
    }, [layouts, forceLayout])

    const [layout, setLayout] = React.useState<keyof L | 'default'>('default')

    React.useEffect(() => {
        setLayout(findMatch() || 'default')
    }, [layouts, findMatch])

    React.useEffect(() => {
        if (forceLayout) return

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
    }, [findMatch, forceLayout])

    return React.useMemo(() => {
        let dl = defaultLayout
        if (forceLayout) {
            return [forceLayout, layouts[forceLayout] as LayoutSpec]
        }

        if (layout === 'default') {
            if (!dl) {
                dl = Object.keys(layouts)[0]
            }
            return [defaultLayout || 'unknown', layouts[dl || 'default'] as LayoutSpec]
        }

        return [layout as string, layouts[layout] as LayoutSpec]
    }, [forceLayout, defaultLayout, layout, layouts])
}

export function useCurrentLayout() {
    return
}

export const useIsLayoutActive = (layout?: string) => {
    const ctx = useGridContextState()
    if (!ctx) return false

    return layout == null || layout === ctx.layoutId
}

export function useGridContextState() {
    const ctx = React.useContext<GridContext | null>(gridContext)
    return ctx?.state || null
}

export function useGridContextDispatch() {
    const ctx = React.useContext<GridContext | null>(gridContext)
    return ctx?.dispatch || null
}
