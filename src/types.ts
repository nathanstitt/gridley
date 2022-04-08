import * as React from 'react'
import type { CSSObject } from '@emotion/react'

export interface LayoutSpec {
    style: CSSObject
    min: string | number
    max: string | number
}

export type Layouts = Record<string, LayoutSpec>

export type LayoutKey = keyof Layouts

export type GridContext<T> = [T[], string, LayoutSpec]

export const gridContext = React.createContext<GridContext<any> | null>(null)
gridContext.displayName = 'GridContext'

export const GridContextProvider = gridContext.Provider

export const gridAreaContext = React.createContext<string>('unknown')
gridAreaContext.displayName = 'GridAreaContext'
export const GridAreaContextProvider = gridAreaContext.Provider
