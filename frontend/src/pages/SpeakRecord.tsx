import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import Recording from '../components/Recording';

export default function SpeakTest() {
  

  
  return (
    <IonPage>
    
      <IonContent>
        <IonButton onClick={()=>{Recording()}}>audio</IonButton>
      </IonContent>
    </IonPage>
  );
};