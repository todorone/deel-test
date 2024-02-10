import { IonItem, IonLabel, IonNote } from '@ionic/react'
import './payslipListItem.css'
import { Payslip, useMarkPayslipRead } from '../../data/payslips'

interface Props {
  payslip: Payslip
}

function PayslipListItem({ payslip }: Props) {
  const { mutate } = useMarkPayslipRead()

  return (
    <IonItem
      onClick={() => {
        mutate(payslip.id)
      }}
      routerLink={`/payslip/${payslip.id}`}
      detail={false}
    >
      <div slot="start" className={`dot${payslip.isUnread ? ' dot-unread' : ''}`} />
      <IonLabel className="ion-text-wrap">
        <h2>
          #{payslip.id}
          <IonNote>${payslip.amount}</IonNote>
        </h2>

        <p className={'name'}>{payslip.name}</p>

        <p className={'date'}>
          Period: {payslip.startDate} - {payslip.endDate}
        </p>
      </IonLabel>
    </IonItem>
  )
}

export default PayslipListItem
