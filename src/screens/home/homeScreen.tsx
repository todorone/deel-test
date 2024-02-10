import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useGetPayslips } from '../../data/payslips'
import PayslipListItem from './payslipListItem'
import './homeScreen.css'

function HomeScreen() {
  const { data: payslips } = useGetPayslips()

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payslips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Payslips</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {payslips.map(payslip => (
            <PayslipListItem key={payslip.id} payslip={payslip} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default HomeScreen
