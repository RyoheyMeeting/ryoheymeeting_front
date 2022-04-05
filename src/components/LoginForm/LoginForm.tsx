import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { firebase, getAuth } from "firebase_config";

type Props = {
  signInSuccessUrl?: string;
};

export const LoginForm: React.FC<Props> = (props) => {
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: props.signInSuccessUrl ? props.signInSuccessUrl : "/#",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID],
  };

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
};
