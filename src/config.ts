const Config = () => {
  return {
    isDev: process.env.NODE_ENV === "development",
    firebase: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    },
    emulator: {
      host: process.env.REACT_APP_EMULATOR_HOST,
      ports: {
        authentication: Number(process.env.REACT_APP_EMULATOR_PORT_AUTHENTICATION),
        firestore: Number(process.env.REACT_APP_EMULATOR_PORT_FIRESTORE),
        database: Number(process.env.REACT_APP_EMULATOR_PORT_DATABASE),
        storage: Number(process.env.REACT_APP_EMULATOR_PORT_STORAGE),
      },
    },
  };
};
export const firebaseConfig = Config().firebase;
export default Config();
