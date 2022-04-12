import * as React from 'react'

import {
    GridContextState,
    GridContextStoreState,
    GridContextProps,
    Layouts,
    GridContextAction,
    GridContext,
} from './types'
import { useCurrentLayoutMatch } from './util'

function gridContextReducer<Data>(state: GridContextStoreState<Data>, action: GridContextAction) {
    switch (action.type) {
        case 'ADD_LAYOUT': {
            const { layout } = action
            return {
                ...state,
                layouts: { ...state.layouts, [layout.id]: layout },
            }
        }
        case 'ADD_RENDERER': {
            const { renderer } = action
            return {
                ...state,
                renderers: { ...state.renderers, [renderer.columnId]: renderer },
            }
        }
    }
    // return state
}

export function useGridContextProvider<Data>(
    data: Data,
    props: GridContextProps
): GridContext<Data> {
    const [state, dispatch] = React.useReducer(gridContextReducer, {
        data,
        props,
        layouts: {} as Layouts,
        columns: [],
    } as GridContextStoreState<Data>)

    const [layoutId, currentLayout] = useCurrentLayoutMatch(state.layouts, props)

    return React.useMemo(
        () => ({
            state: { ...state, layoutId, currentLayout } as GridContextState<Data>,
            dispatch,
        }),
        [state, dispatch, layoutId, currentLayout]
    )
}
