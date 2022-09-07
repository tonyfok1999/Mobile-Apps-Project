import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonRouter,
  } from "@ionic/react";
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();
  
    const doLogin = () => {
      navigation.push("/tabs/homePage", "root", "replace");
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 1</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonButtons>
            <IonButton onClick={() => doLogin()}>Login</IonButton>
          </IonButtons>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
  