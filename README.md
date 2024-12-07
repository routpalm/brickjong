# VisuaLoom Frontend (Web Server & Art Generation)
## File Creation Date
2024-12-06

## Brief Description of the System
The frontend system of VisuaLoom provides a user interface for uploading images and selecting generative art algorithms. It transforms user-uploaded images into algorithmic artworks. Users can choose from various algorithms, process their images, and view or save the generated art. This frontend communicates with the backend ([found here](https://www.github.com/routpalm/visualoom-backend)) for authentication, user sessions, and data storage.

## Authors
- Nicholas Anthony
- Tong Guan
- Jordan Poppe
- Brett DeWitt


## Course Name and Assignment
This project was developed as part of the CS422 Software Methodology course, Fall 2024 semester project.

# Environment

**Please note: you do not need to set up this project in order to test its functionality, frontend is available [here](https://visualoom-frontend-cda18fc28777.herokuapp.com/)**
## Steps to reproduce:
- Download and Install [Node.js from the official website](https://nodejs.org/en)
- Verify by running  
```node --version; npm --version```
- Node version: v20.18.0
- NPM version: 10.8.2
- Clone the repo into your local machine and swap into the folder
- Initialize dependencies by running ```npm install```
- Make sure react-scripts is installed by running ```npm install react-scripts```
  # Usage
  - add an .env file in the repo folder with two lines: 
  - ```REACT_APP_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID```
  - ```REACT_APP_BACK_END_API_URL=BACK_END_API_URL```
  - GOOGLE_CLIENT_ID = your OAuth Client ID from Google Cloud Console
  - REACT_APP_BACK_END_API_URL = ```https://visualoom-8a10785743bd.herokuapp.com``` if wanting to connect to the hosted backend or the URL of the backend hosted on your machine.
  - Run the web server by running ```npm start``` (note: make sure react-scripts are installed for this step. you may have to do it manually)
  - the web server will automatically open or is available at ```http://localhost:3000```

  **Backend Setup**:
   - Ensure the backend server (responsible for handling authentication, token validation, and data storage) is running and accessible.
   - Without the backend, features such as saving artworks, liking artworks, or user authentication may not work as intended.

## Software Dependencies
- **Node.js**: ≈v20.18.0  
- **NPM**: ≈v10.8.2  
- **React, React Scripts, and other frontend libraries**: Installed via `npm install`.  
- **@react-oauth/google**: For Google Login integration.  
- **p5.js**: For generative sketches.  
- **ExifReader**, **ColorThief**: For image processing.

## Directory Structure Overview

- **/src**: Main source directory.  
  - **/apiclient**: API client modules (`artworks.js`, `likes.js`, `users.js`) to communicate with backend endpoints.  
  - **/components**: Reusable UI components (e.g., `Navbar`, `Toolbar`, `FileUploader`).  
  - **/hooks**: Custom React hooks (e.g., `useImageProcessor.js`) for image processing logic.  
  - **/images**: Static image assets for algorithm previews and UI elements.  
  - **/pages**: Top-level page components (e.g., `Homepage`, `WeaveArtwork`, `GeneratedArtwork`, `ExploreSeeds`, `MyGallery`).  
  - **/sketches**: p5.js sketches for different generative art algorithms.  
- **/public**: Static files, including `index.html` and `favicon`. (index.html not being used)
- **package.json**: Project metadata and dependency list.  
- **.env**: Environment variables, such as `REACT_APP_GOOGLE_CLIENT_ID`.  
- **README.md**: This documentation file.

