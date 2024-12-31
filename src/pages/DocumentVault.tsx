import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonAlert,
  IonIcon,
  IonTextarea,
} from '@ionic/react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { trashOutline, closeOutline } from 'ionicons/icons';
import Header from '../components/Header';

interface Document {
  filepath: string;
  content?: string;
}

const DocumentVault: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const folderName = 'MyVaultDocuments';

  useEffect(() => {
    createAppFolder();
    loadSavedDocuments();
  }, []);

  const createAppFolder = async () => {
    try {
      await Filesystem.mkdir({
        directory: Directory.External,
        path: folderName,
        recursive: true,
      });
    } catch (error) {
      if ((error as any).message !== 'Directory already exists') {
        console.error('Error creating app folder:', error);
      }
    }
  };

  const saveDocument = async () => {
    if (!fileName.trim() || !fileContent.trim()) {
      alert('Please provide both file name and content.');
      return;
    }

    try {
      const filePath = `${folderName}/${fileName.trim()}.txt`;
      await Filesystem.writeFile({
        path: filePath,
        data: fileContent.trim(),
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });

      alert('Document saved successfully!');
      setFileName('');
      setFileContent('');
      loadSavedDocuments();
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Failed to save the document.');
    }
  };

  const loadSavedDocuments = async () => {
    try {
      const { files } = await Filesystem.readdir({
        directory: Directory.External,
        path: folderName,
      });

      const loadedDocuments = files.map((file) => ({
        filepath: `${folderName}/${file.name}`,
      }));

      setDocuments(loadedDocuments);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const openDocument = async (document: Document) => {
    try {
      const fileData = await Filesystem.readFile({
        path: document.filepath,
        directory: Directory.External,
        encoding: Encoding.UTF8,
      });

      setSelectedDocument({
        ...document,
        content: fileData.data,
      });
      setEditedContent(fileData.data);
    } catch (error) {
      console.error('Error reading document:', error);
      alert('Failed to open document.');
    }
  };

  const saveEditedDocument = async () => {
    if (selectedDocument) {
      try {
        await Filesystem.writeFile({
          path: selectedDocument.filepath,
          data: editedContent.trim(),
          directory: Directory.External,
          encoding: Encoding.UTF8,
        });
        alert('Document updated successfully!');
        setSelectedDocument(null);
        loadSavedDocuments();
      } catch (error) {
        console.error('Error saving updated document:', error);
        alert('Failed to save the updated document.');
      }
    }
  };

  const deleteDocument = async () => {
    if (selectedDocument) {
      try {
        await Filesystem.deleteFile({
          path: selectedDocument.filepath,
          directory: Directory.External,
        });

        setDocuments((docs) =>
          docs.filter((doc) => doc.filepath !== selectedDocument.filepath)
        );
        setSelectedDocument(null);
        setIsAlertOpen(false);
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  return (
    <IonPage>
      <Header title="Document Vault" />
      <IonContent className="ion-padding">
        <IonItem style={{ marginBottom: '16px' }}>
          <IonLabel position="stacked">File Name</IonLabel>
          <IonInput
            value={fileName}
            onIonInput={(e: any) => setFileName(e.target.value)}
            placeholder="Enter file name"
          />
        </IonItem>
        <IonItem style={{ marginBottom: '16px' }}>
          <IonLabel position="stacked">File Content</IonLabel>
          <IonInput
            value={fileContent}
            onIonInput={(e: any) => setFileContent(e.target.value)}
            placeholder="Enter file content"
          />
        </IonItem>
        <IonButton expand="block" onClick={saveDocument} style={{ marginBottom: '20px' }}>
          Save Document
        </IonButton>

        <IonGrid>
          <IonRow>
            {documents.map((doc, index) => (
              <IonCol size="12" key={index}>
                <IonItem button onClick={() => openDocument(doc)}>
                  <IonLabel>{doc.filepath.split('/').pop()}</IonLabel>
                  <IonButton
                    fill="clear"
                    color="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDocument(doc);
                      setIsAlertOpen(true);
                    }}
                  >
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonItem>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonModal isOpen={!!selectedDocument?.content} onDidDismiss={() => setSelectedDocument(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Edit Document</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedDocument(null)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div style={{ padding: '16px' }}>
              <h3>{selectedDocument?.filepath.split('/').pop()}</h3>
              <IonTextarea
                value={editedContent}
                onIonInput={(e: any) => setEditedContent(e.target.value)}
                placeholder="Edit your content here"
                style={{ width: '100%', minHeight: '200px', marginBottom: '16px' }}
              ></IonTextarea>
              <IonButton expand="block" onClick={saveEditedDocument}>Save Changes</IonButton>
            </div>
          </IonContent>
        </IonModal>

        <IonAlert
          isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header="Confirm Delete"
          message="Are you sure you want to delete this document?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setIsAlertOpen(false),
            },
            {
              text: 'Delete',
              role: 'confirm',
              handler: deleteDocument,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default DocumentVault;
