import * as React from 'react'
import { produce, Draft } from 'immer'
import deepmerge from 'deepmerge'

import {
    GridContextState,
    GridContextProps,
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
            case 'SET_RENDERERS': {
                draft.renderers = action.renderers
                return
            }
        }
    }
)

export function useGridContextProvider(props: GridContextProps): GridContext {
    const [state, dispatch] = React.useReducer(gridContextReducer, {
        layouts: {} as Layouts,
        renderers: {} as Renderers,
        props,
    } as GridContextStoreState)

    const [layoutId, currentLayout] = useCurrentLayoutMatch(
        state.layouts,
        props.defaultLayout,
        props.forceLayout
    )

    return React.useMemo(
        () => ({
            state: { ...state, layoutId, currentLayout } as GridContextState,
            dispatch,
        }),
        [state, dispatch, layoutId, currentLayout]
    )
}
