import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { SimpleDemo } from './simple-demo'

const rootEl = document.getElementById('root')
const root = createRoot(rootEl)
root.render(<SimpleDemo />)
