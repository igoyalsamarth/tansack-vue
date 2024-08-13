import { faker } from '@faker-js/faker'

export type Person = {
    uid: number | null
    category: string
    recurring: string | null
    invoiceDate: Date
    partyName: string
    description: string
    amount: number
    approval: string
    pendingApprovalFrom: "no" | "pending" | "all" | string | null
    paymentStatus: "partial" | "paid" | "unpaid"
    accountingStatus: boolean
    subRows?: Person[]
}

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newPerson = (): Person => {
    return {
        uid: Math.random() < 0.5 ? faker.number.int({ min: 100, max: 999 }) : null,
        category: faker.helpers.shuffle<Person['category']>([
            "Default", "Pay Roll", "Petty Cash", "Sub Grant"
        ])[0]!,
        recurring: faker.helpers.shuffle<Person['recurring']>([
            "RE #2", "RE #3", "RE #232", null
        ])[0]!,
        invoiceDate: faker.date.anytime(),
        partyName: faker.company.name(),
        description: faker.lorem.sentence(),
        amount: faker.number.int(100000),
        approval: faker.helpers.shuffle<Person['approval']>([
            "Approved", "Pending", "Rejected"
        ])[0]!,
        pendingApprovalFrom: faker.helpers.shuffle<Person['pendingApprovalFrom']>([
            "no", "pending", "all", "jayew@erp4impact.com", null
        ])[0]!,
        paymentStatus: faker.helpers.shuffle<Person['paymentStatus']>([
            "partial", "paid", "unpaid"
        ])[0]!,
        accountingStatus: faker.helpers.shuffle<boolean>([
            true, false
        ])[0]!
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!
        return range(len).map((): Person => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}
