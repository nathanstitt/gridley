import * as React from 'react'
import { cx } from '@emotion/css'
import styled from '@emotion/styled'

const HeadingDiv = styled.div({
    display: 'contents',
})

interface HeadingProps {
    className?: string
}

export const Heading: React.FC<HeadingProps> = ({ className, children }) => {
    return <HeadingDiv className={cx('heading', className)}>{children}</HeadingDiv>
}
