import * as React from 'react'
import { cx } from '@emotion/react'

import { useIsLayoutActive } from './util'

export interface CaptionProps {
    className?: string
    layout?: string
}

export const Caption: React.FC<CaptionProps> = ({ className, children, layout }) => {
    if (!useIsLayoutActive(layout)) return null

    return <div className={cx('caption', className)}>{children}</div>
}
