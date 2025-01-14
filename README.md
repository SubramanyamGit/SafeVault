# SafeVault

SafeVault is a multi-utility application designed for photo management, location tracking, and document storage. It combines essential features like camera functionalities, live location tracking, and document management into a single, easy-to-use application. Built with Ionic React, the app offers cross-platform compatibility, enabling seamless usage on both Android and iOS devices.

## Features

### 1. Camera
- **Functionality**:
  - Capture photos directly within the app or select photos from the gallery.
  - Save captured photos in a dedicated folder for easy access.
  - View photos in a grid layout and delete them as needed.
- **Technology**:
  - [Capacitor Camera Plugin](https://capacitorjs.com/docs/apis/camera) for capturing and accessing photos.
  - [Capacitor Filesystem Plugin](https://capacitorjs.com/docs/apis/filesystem) for saving and managing photos.

### 2. Live Location Tracker
- **Functionality**:
  - Fetch and display current latitude and longitude.
  - Save locations with custom names.
  - Share saved locations via other apps or open them in Google Maps.
- **Technology**:
  - [Capacitor Geolocation Plugin](https://capacitorjs.com/docs/apis/geolocation) for fetching live GPS coordinates.
  - [Capacitor Share API](https://capacitorjs.com/docs/apis/share) for sharing location details.

### 3. Document Vault
- **Functionality**:
  - Create, view, edit, and delete text-based documents.
  - List all saved documents for easy access.
- **Technology**:
  - [Capacitor Filesystem Plugin](https://capacitorjs.com/docs/apis/filesystem) for managing document files.

## User Flows

### Camera Flow
1. Open the Camera tab.
2. Tap "Take Photo" to capture a new photo or select one from the gallery.
3. View saved photos in a grid layout.
4. Tap a photo to open it in the viewer and optionally delete it.

### Live Location Flow
1. Open the Location tab.
2. Tap "Get Location" to fetch and display current coordinates.
3. Tap "Save Location" to name and store the location.
4. Share or delete saved locations via respective buttons.

### Document Vault Flow
1. Open the Vault tab.
2. Enter the file name and content in the input fields.
3. Tap "Save Document" to store the file.
4. View the list of saved documents.
5. Tap a document to edit or delete it.

## Steps to Run the Application

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SubramanyamGit/SafeVault.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Ionic Application**
   ```bash
   ionic build
   ```

4. **Add Android Platform**
   ```bash
   npx cap add android
   ```

5. **Run the Development Server**
   ```bash
   npm run dev -- --host=0.0.0.0
   ```

6. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

## Technical Details

- **Framework & Libraries**:
  - Ionic React for cross-platform UI development.
  - Capacitor Plugins:
    - Camera: For photo capture and management.
    - Filesystem: For file storage and retrieval.
    - Geolocation: For real-time location tracking.
    - Share: For sharing data across applications.

- **Design**:
  - Dark theme for improved UX and energy efficiency.
  - Intuitive layout with appropriate spacing and alignment.

- **Storage & Security**:
  - Local storage for photos and documents to ensure user privacy.
  - Secure APIs for location sharing.
