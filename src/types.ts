import * as React from 'react'
import type { CSSObject } from '@emotion/react'

export interface LayoutSpec {
    id: string
    style?: CSSObject
    stripe?: boolean | 'string'
    min: string | number
    max: string | number
    stickyHeaderTop?: boolean | number | string
    columns: ColumnSpec[]
}

export const JUSTIFY_CONTENT = {
    around: 'around',
    between: 'between',
    center: 'center',
    end: 'flex-end',
    start: 'flex-start',
    stretch: 'stretch',
}

export interface LayoutColumnSpec {
    id: string
    min?: string | number
    max?: string | number
    width?: string | number
    colSpan?: number
    wrap?: boolean | number | string
    rowSpan?: number
    justify?: keyof typeof JUSTIFY_CONTENT
}

export interface RendererSpec {
    id: string
    dataPath?: string
    header?: React.ReactElement
    body?: React.ReactElement
}

export interface ColumnSpec extends LayoutColumnSpec, RendererSpec {}

export interface GridContextProps extends Record<string, any> {
    defaultLayout?: string
    forceLayout?: string
    rowAttributes?:
        | React.HTMLAttributes<HTMLDivElement>
        | ((rowData: any, layout: LayoutSpec) => React.HTMLAttributes<HTMLDivElement>)
}
export type Layouts = Record<string, LayoutSpec>
export type Renderers = Record<string, RendererSpec>
export interface GridContextStoreState {
    props: any // work around some attributes values being typed as "readonly string" which immer doesn't like
    layouts: Layouts
    renderers: Renderers
}

export interface GridContextState extends GridContextStoreState {
    currentLayout: LayoutSpec
    layoutId: string
}

export type GridContextAction =
    | { type: 'ADD_LAYOUT'; layout: LayoutSpec }
    | { type: 'SET_RENDERERS'; renderers: Renderers }

export interface GridContext {
    state: GridContextState
    dispatch: React.Dispatch<GridContextAction>
}

export const gridContext = React.createContext<GridContext | null>(null)
gridContext.displayName = 'GridContext'

export const GridContextProvider = gridContext.Provider
