import * as React from 'react'

import styled from '@emotion/styled'
import { faker } from '@faker-js/faker'

import { Gridley, Heading, Caption, Body, Row, Cell } from '../src/index'

const Grid = styled(Gridley)({})

interface DataRow {
    id: number
    name: string
}
const DATA: DataRow[] = [
    { id: 1, name: 'Tester McTesty' },
].concat([...Array(29)].map(() => ({
    id: faker.datatype.number(),
    name: faker.name.findName(),
})))

const Name: React.FC<{ data: string }> = ({ data: name }) => (
    <span data-testid={name}>NAME: {name}</span>
)

export const SimpleDemo = () => {
    return (
        <Grid
            caption={<Caption>Hello caption</Caption>}
            defaultLayout="mobile"
            data={DATA}
            layouts={{
                mobile: {
                    min: 0,
                    max: 500,
                    style: {
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        '.cell.id': { color: 'red' },
                    },
                },
                desktop: {
                    min: '30rem',
                    max: '100vw',
                    style: {
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    },
                },
            }}
        >
        <Heading>
            <Row layout="mobile">
                <Cell id="name">mobile Name</Cell>
                <Cell id="id">mobile ID</Cell>
            </Row>
            <Row layout="desktop">
                <Cell id="id">desktop ID</Cell>
                <Cell id="name">desktop Name</Cell>
            </Row>
        </Heading>
        <Body>
            <Row layout="mobile">
                <Cell id="name" Component={Name} />
                <Cell id="id" render={(n: number) => <div data-testid={`id-${n}`}>ID: {n}</div>} />
            </Row>
            <Row layout="desktop">
                <Cell id="id" render={(n: number) => <div data-testid={`id-${n}`}>ID: {n}</div>} />
                <Cell id="name" Component={Name} />
            </Row>
        </Body>
        </Grid>
    )
}
