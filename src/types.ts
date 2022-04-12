import * as React from 'react'
import type { CSSObject } from '@emotion/react'

// export interface ColumnSpec {
//     columnId: string
//     width: string
//     rowSpan?: number
// }

export interface LayoutSpec {
    id: string
    style?: CSSObject
    min: string | number
    max: string | number
    columns: ColumnSpec[]
}

//export type Layouts = Record<string, LayoutSpec>
//export type LayoutKey = keyof Layouts

export interface ColumnSpec {
    id: string
    min?: string | number
    max?: string | number
    width?: string | number
    colSpan?: number
    rowSpan?: number
}

export interface RendererSpec {
    columnId: string
    dataPath?: string
    header: React.ReactElement
    body: React.ReactElement
}

export interface GridContextProps extends Record<string, any> {
    defaultLayout?: string
    forceLayout?: string
}

export interface GridContextStoreState<Data> {
    data: Data
    props: GridContextProps
    layouts: Record<string, LayoutSpec>
    renderers: Record<string, RendererSpec>
}

export interface GridContextState<T> extends GridContextStoreState<T> {
    currentLayout: LayoutSpec
    layoutId: string
}

export type GridContextAction =
    | { type: 'ADD_LAYOUT'; layout: LayoutSpec }
    | { type: 'ADD_RENDERER'; renderer: RendererSpec }

export interface GridContext<Data> {
    state: GridContextState<Data>
    dispatch: React.Dispatch<GridContextAction>
}

export const gridContext = React.createContext<GridContext<any> | null>(null)
gridContext.displayName = 'GridContext'

export const GridContextProvider = gridContext.Provider
