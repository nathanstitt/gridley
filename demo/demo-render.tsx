import * as React from 'react'
import { createRoot } from 'react-dom/client'

import Demo from './demo'

const rootEl = document.getElementById('root')
if (rootEl) {
    const root = createRoot(rootEl)
    root.render(
        <React.StrictMode>
            <Demo />
        </React.StrictMode>
    )
}
