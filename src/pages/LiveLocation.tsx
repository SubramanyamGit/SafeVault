import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
} from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import { shareSocialOutline, trashOutline } from 'ionicons/icons';
import Header from '../components/Header';

interface SavedLocation {
  name: string;
  url: string;
  date: string;
}

const LiveLocation: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<SavedLocation | null>(null);

  useEffect(() => {
    loadSavedLocations();
  }, []);

  const getLocation = async () => {
    console.log("error")
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const shareLocation = async (locationUrl: string) => {
    try {
      await Share.share({
        title: 'My Current Location',
        text: `Here is my current location:`,
        url: locationUrl,
        dialogTitle: 'Share Location',
      });
    } catch (error) {
      console.error('Error sharing location:', error);
    }
  };

  const saveLocation = () => {
    if (location) {
      const locationName = prompt('Enter a name for this location:');
      if (locationName && locationName.trim()) {
        const locationUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        const savedDate = new Date().toLocaleString();
        const newLocation = { name: locationName, url: locationUrl, date: savedDate };

        const updatedLocations = [...savedLocations, newLocation];
        setSavedLocations(updatedLocations);
        localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
      } else {
        alert('Please enter a valid name for the location.');
      }
    } else {
      alert('Please get your location first before saving.');
    }
  };

  const loadSavedLocations = () => {
    const storedLocations = localStorage.getItem('savedLocations');
    if (storedLocations) {
      setSavedLocations(JSON.parse(storedLocations));
    }
  };

  const deleteLocation = () => {
    if (locationToDelete) {
      const updatedLocations = savedLocations.filter(
        (loc) => loc !== locationToDelete
      );
      setSavedLocations(updatedLocations);
      localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
      setLocationToDelete(null);
      setIsAlertOpen(false);
    }
  };

  return (
    <IonPage>
      <Header title="Live Location" />
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your Location</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {location ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p>Latitude: {location.latitude}</p>
                  <p>Longitude: {location.longitude}</p>
                </div>
                <IonIcon
                  icon={shareSocialOutline}
                  style={{
                    fontSize: '24px',
                    color: '#007aff',
                    cursor: 'pointer',
                  }}
                  onClick={() => shareLocation(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`)}
                />
              </div>
            ) : (
              <p>Click the button to get your location.</p>
            )}
            <IonButton expand="block" onClick={getLocation}>
              Get Location
            </IonButton>
            <IonButton expand="block" onClick={saveLocation}>
              Save Location
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonGrid style={{ marginTop: '16px' }}>
          <IonRow>
            {savedLocations.map((savedLocation, index) => (
              <IonCol size="12" key={index} style={{ marginBottom: '16px' }}>
                <IonCard style={{ position: 'relative', padding: '16px' }}>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '8px' }}>
                    <IonIcon
                      icon={shareSocialOutline}
                      style={{
                        fontSize: '20px',
                        color: '#007aff',
                        cursor: 'pointer',
                      }}
                      onClick={() => shareLocation(savedLocation.url)}
                    />
                    <IonIcon
                      icon={trashOutline}
                      style={{
                        fontSize: '20px',
                        color: 'red',
                        cursor: 'pointer',
                        marginLeft:'10px'
                      }}
                      onClick={() => {
                        setLocationToDelete(savedLocation);
                        setIsAlertOpen(true);
                      }}
                    />
                  </div>
                  <IonCardHeader>
                    <IonCardTitle>{savedLocation.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      <a
                        href={savedLocation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007aff', textDecoration: 'underline' }}
                      >
                        Open in Google Maps
                      </a>
                    </p>
                    <p>Saved on: {savedLocation.date}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header="Confirm Delete"
          message="Are you sure you want to delete this location?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'ion-alert-button-cancel',
              handler: () => setIsAlertOpen(false),
            },
            {
              text: 'Delete',
              role: 'confirm',
              cssClass: 'ion-alert-button-delete',
              handler: deleteLocation,
            },
          ]}
          cssClass="custom-alert"
        />

        <style>
          {`
          .custom-alert .alert-wrapper {
            padding: 16px !important;
          }
          .ion-alert-button-cancel {
            color: #007aff;
          }
          .ion-alert-button-delete {
            color: red;
          }
          `}
        </style>
      </IonContent>
    </IonPage>
  );
};

export default LiveLocation;
