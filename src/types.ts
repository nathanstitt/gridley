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
    stripe?: true | 'string'
    min: string | number
    max: string | number
    columns: ColumnSpec[]
}

//export type Layouts = Record<string, LayoutSpec>
//export type LayoutKey = keyof Layouts

export const JUSTIFY_CONTENT = {
    around: 'around',
    between: 'between',
    center: 'center',
    end: 'flex-end',
    start: 'flex-start',
    stretch: 'stretch',
}

export interface ColumnSpec {
    id: string
    min?: string | number
    max?: string | number
    width?: string | number
    colSpan?: number
    rowSpan?: number
    justify?: keyof typeof JUSTIFY_CONTENT
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
export type Layouts = Record<string, LayoutSpec>
export type Renderers = Record<string, RendererSpec>
export interface GridContextStoreState {
    props: GridContextProps
    layouts: Layouts
    renderers: Renderers
}

export interface GridContextState extends GridContextStoreState {
    currentLayout: LayoutSpec
    layoutId: string
}

export type GridContextAction =
    | { type: 'ADD_LAYOUT'; layout: LayoutSpec }
    | { type: 'ADD_RENDERER'; renderer: RendererSpec }

export interface GridContext {
    state: GridContextState
    dispatch: React.Dispatch<GridContextAction>
}

export const gridContext = React.createContext<GridContext | null>(null)
gridContext.displayName = 'GridContext'

export const GridContextProvider = gridContext.Provider
