import * as React from 'react'

import { ColumnSpec } from './types'

interface ColumnProps extends Omit<ColumnSpec, 'row' | 'rowSpan'> {
    row?: number
    rowSpan?: number
}

export const Column: React.FC<ColumnProps> = () => {
    return null
}
