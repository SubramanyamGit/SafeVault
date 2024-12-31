import React from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { locationSharp, cameraSharp, documentTextSharp } from 'ionicons/icons';
import LiveLocation from '../pages/LiveLocation';
import EmergencyCamera from '../pages/EmergencyCamera';
import DocumentVault from '../pages/DocumentVault';

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      {/* Tab Routes */}
      <Route path="/tabs/live-location" component={LiveLocation} exact />
      <Route path="/tabs/emergency-camera" component={EmergencyCamera} exact />
      <Route path="/tabs/document-vault" component={DocumentVault} exact />

      {/* Redirect default route to the first tab */}
      <Redirect exact path="/tabs" to="/tabs/live-location" />
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
    
      <IonTabButton tab="emergency-camera" href="/tabs/emergency-camera">
        <IonIcon icon={cameraSharp} />
        <IonLabel>Camera</IonLabel>
      </IonTabButton>
      <IonTabButton tab="live-location" href="/tabs/live-location">
        <IonIcon icon={locationSharp} />
        <IonLabel>Location</IonLabel>
      </IonTabButton>
      <IonTabButton tab="document-vault" href="/tabs/document-vault">
        <IonIcon icon={documentTextSharp} />
        <IonLabel>Vault</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
