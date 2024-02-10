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
  useIonToast,
} from '@ionic/react'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { personCircle, checkmarkCircle, alertCircle } from 'ionicons/icons'
import { useParams } from 'react-router'
import { useGetPayslips } from '../../data/payslips'
import { IS_NATIVE } from '../../utils'
import './payslipDetailsScreen.css'

function PayslipDetailsScreen() {
  const { data: payslips } = useGetPayslips()

  const payslipId = useParams<{ id: string }>().id
  const payslip = payslips.find(payslip => payslip.id === payslipId)

  const [showToast] = useIonToast()

  const handlePayslipDownloadNative = async () => {
    if (payslip === undefined) return

    try {
      await Filesystem.downloadFile({
        url: payslip.imageUrl,
        path: 'payslip.png',
        directory: Directory.Documents,
      })

      showToast({
        message: 'Payslip successfully downloaded to Documents',
        duration: 2000,
        position: 'top',
        color: 'success',
        icon: checkmarkCircle,
      })
    } catch {
      showToast({
        message: 'Issue occured on payslip download',
        duration: 2000,
        position: 'top',
        color: 'danger',
        icon: alertCircle,
      })
    }
  }

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
              <IonIcon aria-hidden="true" icon={personCircle} color="primary" />

              <IonLabel className="ion-text-wrap">
                <h2>
                  {payslip.name} <IonNote>#{payslip.id}</IonNote>
                </h2>
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
              <img src={payslip.imageUrl} alt="Payslip" />
            </div>

            <IonButton
              href={IS_NATIVE ? undefined : payslip.imageUrl}
              download="payslip.png"
              className="ion-padding download-button"
              onClick={IS_NATIVE ? handlePayslipDownloadNative : undefined}
            >
              Download Payslip
            </IonButton>
          </>
        ) : (
          <div className="ion-padding">
            Oops, payslip not found, we're already investigating it...
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default PayslipDetailsScreen
