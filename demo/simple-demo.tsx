import * as React from 'react'
import styled from '@emotion/styled'
import { faker } from '@faker-js/faker'

import {
    Gridley,
    Cell,
    Caption,
    Layout,
    Columns,
    Column,
    ColumnLayout,
    Layout,
    Renderer,
} from '../src/index'

const Grid = styled(Gridley)({})

interface DataRow {
    id: number
    name: string
}
const DATA: DataRow[] = [{ id: 1, firstName: 'Tester', lastName: 'McTesty' }].concat(
    [...Array(29)].map(() => ({
        id: faker.datatype.number(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    }))
)

const Name: React.FC<{ data: string }> = ({ data: name }) => (
    <span data-testid={name}>NAME: {name}</span>
)

export const SimpleDemo = () => {
    return (
        <Grid data={DATA} defaultLayout="mobile" caption={<Caption>Hello caption</Caption>}>
            <Renderer
                columnId="id"
                header={<Cell>ID</Cell>}
                body={<Cell render={(n: number) => <span>{n}</span>} />}
            />
            <Renderer
                columnId="firstName"
                header={<Cell id="name">F Name</Cell>}
                body={<Cell id="name" render={(n: string) => <span>{n}</span>} />}
            />
            <Renderer
                columnId="lastName"
                header={<Cell>L Name</Cell>}
                body={<Cell render={(id: number) => id} />}
            />

            <Layout
                id="mobile"
                min="0"
                max="500"
                style={{
                    '.grid-cell.id': { color: 'red' },
                }}
            >
                <Column id="id" min={10} max={100} rowSpan={2} />
                <Column id="firstName" />
                <Column id="lastName" colSpan={0} />
            </Layout>

            <Layout id="desktop" min={501} max="100vw">
                <Column id="id" />
                <Column id="firstName" />
                <Column id="lastName" />
            </Layout>
        </Grid>
    )
}
