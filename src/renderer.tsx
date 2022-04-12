import * as React from 'react'

import { useGridContextDispatch } from './util'
import { RendererSpec } from './types'

export const Renderer: React.FC<RendererSpec> = (renderer) => {
    const dispatch = useGridContextDispatch()

    React.useEffect(() => {
        dispatch?.({ type: 'ADD_RENDERER', renderer })
    }, [dispatch, renderer])

    return null
}
