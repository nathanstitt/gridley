import * as React from 'react'
import styled from '@emotion/styled'
import { faker } from '@faker-js/faker'

import {
    Gridley,
    Cell,
    Columns,
    Column,
    Layout,
    useCurrentLayout,
    GridleyProps,
} from '../src/index'

const Grid = styled(Gridley)({})

interface DataRow {
    id: number
    firstName: string
    lastName: string
    address: string
}
const makeData = (): DataRow[] => {
    return [
        {
            id: 1,
            firstName: 'Tester',
            lastName: 'McTesty',
            address: '123 Easy St, Anywhere USA',
            jobTitle: 'Head Cook and Dishwasher',
        },
    ].concat(
        [...Array(29)].map(() => ({
            id: faker.datatype.number(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            address: faker.address.streetAddress(true),
        }))
    )
}

const FirstName: React.FC<{ value?: string }> = ({ value: name }) => (
    <span data-column-id="firstName" data-testid={name}>
        {name}
    </span>
)

const CaptionDiv = styled.div({
    background: 'white',
    height: '30px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
})
const Caption: React.FC<{ onUpdate(): void }> = ({ onUpdate }) => {
    const layout = useCurrentLayout()
    return (
        <CaptionDiv>
            <b>Gridley Demo ({layout?.id})</b>
            <button onClick={onUpdate}>update data</button>
        </CaptionDiv>
    )
}

interface DemoProps extends Omit<GridleyProps<DataRow[]>, 'data'> {
    data?: DataRow[]
}

export const Demo: React.FC<DemoProps> = ({ data: initialData, props }) => {
    const [data, setData] = React.useState(initialData || makeData())

    return (
        <Grid
            data={data}
            defaultLayout="mobile"
            caption={<Caption onUpdate={() => setData(makeData())} />}
            {...props}
        >
            <Columns>
                <Column
                    id="id"
                    header={<Cell>ID</Cell>}
                    body={<Cell render={(n: number) => <span>{n}</span>} />}
                />
                <Column id="firstName" header={<Cell>First Name</Cell>} body={<FirstName />} />
                <Column
                    id="lastName"
                    header={<Cell>Last Name</Cell>}
                    body={<Cell render={(id: number) => id} />}
                />
                <Column id="job" dataPath="jobTitle" header={<Cell>Job</Cell>} body={<Cell />} />
                <Column id="address" header={<Cell>Address</Cell>} body={<Cell />} />
            </Columns>

            <Layout
                stripe
                id="mobile"
                min="0"
                max="500"
                style={{
                    '.grid-cell.id': { color: 'red' },
                    '.grid-header': {
                        '.address, .id': {
                            borderBottom: '1px solid black',
                        },
                    },
                }}
            >
                <Column id="firstName" />
                <Column id="lastName" />
                <Column id="id" min={20} max={80} rowSpan={3} justify="end" />
                <Column id="job" colSpan={2} wrap />
                <Column id="address" colSpan={2} wrap />
            </Layout>

            <Layout
                stripe
                stickyHeaderTop="30px"
                id="tablet"
                min={501}
                max={800}
                style={{
                    '.grid-cell.id': { color: 'red' },
                    '.grid-header > *': { minHeight: '25px' },
                    '.grid-header': {
                        '.job, .address, .id': {
                            borderBottom: '1px solid black',
                        },
                    },
                }}
            >
                <Column id="firstName" />
                <Column id="lastName" />
                <Column id="id" min={20} max={80} rowSpan={2} justify="end" />
                <Column id="job" wrap="25px" />
                <Column id="address" wrap={25} />
            </Layout>

            <Layout
                id="desktop"
                min={801}
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
                <Column id="job" />
                <Column id="address" />
            </Layout>
        </Grid>
    )
}
