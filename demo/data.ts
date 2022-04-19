import { faker } from '@faker-js/faker'

export interface Person {
    id: number
    firstName: string
    lastName: string
    address: string
}

export const makeData = (): Person[] => {
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
