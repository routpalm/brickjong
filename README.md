# VisuaLoom frontend (web server & art generation)

# Environment
## Steps to reproduce:
- Download and Install [Node.js from the official website](https://nodejs.org/en)
- Verify by running  
```node --version; npm --version```
- Node version: v20.18.0
- NPM version: 10.8.2
- Clone the repo into your local machine and swap into the folder
- Initialize dependencies by running ```npm install```
  # Usage
  - add an .env file in the repo folder with a single line: ```REACT_APP_GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID```
  - GOOGLE_CLIENT_ID = your OAuth Client ID from Google Cloud Console
  - Run the web server by running ```npm start``` (note: make sure react-scripts are installed for this step. you may have to do it manually)
  - the web server will automatically open or is available at ```http://localhost:3000```
