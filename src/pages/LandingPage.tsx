import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import Header from '../components/Header';

const LandingPage: React.FC = () => (
  <IonPage>
    <Header title="SafeVault" />
    <IonContent className="ion-text-center ion-padding">
      <h1>Welcome to SafeVault</h1>
      <p>Your ultimate travel and safety companion.</p>
      <IonButton expand="block" href="/tabs">
        Enter App
      </IonButton>
    </IonContent>
  </IonPage>
);

export default LandingPage;
