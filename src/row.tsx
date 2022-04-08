import * as React from 'react'
import styled from '@emotion/styled'
import { cx } from '@emotion/css'

import { useGridData, useIsLayoutActive, useIsInsideGridArea } from './util'
// import { gridContext, GridContext } from './types'

export interface RowProps {
    layout: string
    className?: string
}

const RowDiv = styled.div({
    display: 'contents',
})

export const Row: React.FC<RowProps> = ({ className, layout, children }) => {
    const insideBody = useIsInsideGridArea('body')
    const allData = useGridData()
    if (!useIsLayoutActive(layout)) return null

    if (!insideBody) {
        return <RowDiv className={cx('row', className)}>{children}</RowDiv>
    }
    const rows = allData.map((rowData, rowIndex) => {
        const rowEls = React.Children.map(children, (child, childIndex) => {
            if (!React.isValidElement(child)) {
                return child
            }
            const key = child.props?.id || childIndex
            return React.cloneElement(child, {
                key,
                rowData,
                allData,
                data: rowData[key],
            })
        })
        return <RowDiv key={rowIndex}>{rowEls}</RowDiv>
    })
    return <>{rows}</>
}
