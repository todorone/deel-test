import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  IonButton,
} from '@ionic/react'
import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { Filesystem } from '@capacitor/filesystem'
import { personCircle } from 'ionicons/icons'
import { useParams } from 'react-router'
import { useGetPayslips } from '../../data/payslips'
import './payslipDetailsScreen.css'

function PayslipDetailsScreen() {
  const { data: payslips } = useGetPayslips()

  const payslipId = useParams<{ id: string }>().id
  const payslip = payslips.find(payslip => payslip.id === payslipId)

  return (
    <IonPage id="payslip-details-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Payslips" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {payslip ? (
          <>
            <IonItem>
              <IonIcon aria-hidden="true" icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>{payslip.name}</h2>
                <h3>
                  Period:{' '}
                  <IonNote>
                    {payslip.startDate} - {payslip.endDate}
                  </IonNote>
                </h3>
                <h3>
                  Address: <IonNote>{payslip.address}</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <img src={payslip.imageUrl} />
            </div>

            <IonButton
              className="ion-padding download-button"
              onClick={() => {
                if (payslip === undefined) return

                if (Capacitor.isNativePlatform()) {
                  Filesystem.downloadFile({ url: payslip.imageUrl, path: '/' })
                    .then(result => console.log('result', result))
                    .catch(e => console.error(e))
                } else {
                  Browser.open({ url: payslip.imageUrl })
                }
              }}
            >
              Download Payslip
            </IonButton>
          </>
        ) : (
          <div>Oops, payslip not found, we're already investigating it...</div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default PayslipDetailsScreen
