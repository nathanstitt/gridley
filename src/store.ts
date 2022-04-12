import * as React from 'react'
import { produce, Draft } from 'immer'
import deepmerge from 'deepmerge'

import {
    GridContextState,
    GridContextStoreState,
    Layouts,
    Renderers,
    GridContextAction,
    GridContext,
} from './types'
import { useCurrentLayoutMatch } from './util'

const gridContextReducer = produce(
    (draft: Draft<GridContextStoreState>, action: GridContextAction) => {
        switch (action.type) {
            case 'ADD_LAYOUT': {
                const { layout } = action
                const existing = draft.layouts[layout.id]
                if (existing) {
                    deepmerge(existing, layout)
                } else {
                    draft.layouts[layout.id] = layout
                }
                return
            }
            case 'ADD_RENDERER': {
                const { renderer } = action
                const existing = draft.renderers[renderer.columnId]
                if (existing) {
                    deepmerge(existing, renderer)
                } else {
                    draft.renderers[renderer.columnId] = renderer
                }
                return
            }
        }
    }
)

export function useGridContextProvider(defaultLayout?: string, forceLayout?: string): GridContext {
    const [state, dispatch] = React.useReducer(gridContextReducer, {
        layouts: {} as Layouts,
        renderers: {} as Renderers,
    } as GridContextStoreState)

    const [layoutId, currentLayout] = useCurrentLayoutMatch(
        state.layouts,
        defaultLayout,
        forceLayout
    )

    return React.useMemo(
        () => ({
            state: { ...state, layoutId, currentLayout } as GridContextState,
            dispatch,
        }),
        [state, dispatch, layoutId, currentLayout]
    )
}
