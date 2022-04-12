import * as React from 'react'
import styled from '@emotion/styled'
import { faker } from '@faker-js/faker'

import { Gridley, Cell, Caption, Columns, Column, Layout } from '../src/index'

const Grid = styled(Gridley)({})

interface DataRow {
    id: number
    firstName: string
    lastName: string
}
const makeData = (): DataRow[] => {
    return [{ id: 1, firstName: 'Tester', lastName: 'McTesty' }].concat(
        [...Array(29)].map(() => ({
            id: faker.datatype.number(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        }))
    )
}

const FirstName: React.FC<{ value?: string }> = ({ value: name }) => (
    <span data-column-id="firstName" data-testid={name}>
        NAME: {name}
    </span>
)

export const SimpleDemo = () => {
    const [data, setData] = React.useState(makeData())

    return (
        <Grid
            data={data}
            defaultLayout="mobile"
            caption={
                <Caption>
                    Hello caption <button onClick={() => setData(makeData())}>update</button>
                </Caption>
            }
        >
            <Columns>
                <Column
                    id="id"
                    header={<Cell>ID</Cell>}
                    body={<Cell render={(n: number) => <span>{n}</span>} />}
                />
                <Column id="firstName" header={<Cell>F Name</Cell>} body={<FirstName />} />
                <Column
                    id="lastName"
                    header={<Cell>L Name</Cell>}
                    body={<Cell render={(id: number) => id} />}
                />
            </Columns>

            <Layout
                stripe
                id="mobile"
                min="0"
                max="500"
                style={{
                    '.grid-cell.id': { color: 'red' },
                    '.grid-header': {
                        '.id, .lastName': {
                            borderBottom: '1px solid black',
                        },
                    },
                }}
            >
                <Column id="firstName" />
                <Column id="id" min={20} max={80} rowSpan={2} justify="end" />
                <Column id="lastName" wrap />
            </Layout>

            <Layout
                id="desktop"
                min={550}
                max="100vw"
                style={{
                    '.grid-header > *': {
                        borderBottom: '1px solid black',
                    },
                }}
            >
                <Column id="id" max={120} />
                <Column id="firstName" />
                <Column id="lastName" />
            </Layout>
        </Grid>
    )
}
