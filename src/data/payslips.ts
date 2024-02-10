import { faker } from '@faker-js/faker'
import { useForceUpdate } from '../utils'

export type Payslip = {
  id: string
  startDate: string
  endDate: string
  name: string
  address: string
  amount: number
  imageUrl: string
  isUnread: boolean
}

const payslips: Array<Payslip> = []
for (let i = 0; i < 20; i++) {
  payslips.push({
    id: faker.number.int({ min: 1000000, max: 10000000 }).toString(),
    startDate: faker.date.past().toLocaleDateString(),
    endDate: faker.date.past().toLocaleDateString(),
    name: faker.person.fullName(),
    address: `${faker.location.zipCode()}, ${faker.location.streetAddress()}, ${faker.location.secondaryAddress()}`,
    amount: faker.number.int({ min: 50, max: 1000 }),
    imageUrl: 'https://support.payhero.co.nz/hc/article_attachments/360005912516',
    isUnread: true,
  })
}

export function useGetPayslips () {
  return { data: payslips }
}

export function useMarkPayslipRead () {
  const forceUpdate = useForceUpdate()

  return {
    mutate: (id: string) => {
      const payslip = payslips.find(payslip => payslip.id === id)

      if (payslip !== undefined) {
        payslip.isUnread = false
        forceUpdate()
      }
    }
  }
}
