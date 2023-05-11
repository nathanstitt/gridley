import { faker } from '@faker-js/faker'

export interface Person {
    id: number
    firstName: string
    lastName: string
    address: string
}

export const makeData = (): Person[] => {
    const addr = faker.address
    return [
        {
            id: 1,
            firstName: 'Tester',
            lastName: 'McTesty',
            address: '123 Easy St, Anywhere USA',
            phone: '555-555-5555',
            jobTitle: 'Head Cook and Dishwasher',
        },
    ].concat(
        [...Array(29)].map(() => ({
            id: faker.datatype.number(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phone: faker.phone.number('555-###-###'),
            jobTitle: faker.name.jobTitle(),
            address: `${addr.streetAddress(true)} ${addr.city()} ${addr.state()} ${addr.zipCode()}`,
        }))
    )
}
