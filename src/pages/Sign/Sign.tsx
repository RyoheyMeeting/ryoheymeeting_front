import React from "react";
import { Link } from "react-router-dom";
import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import { LoginForm } from "components/LoginForm/LoginForm";

type Props = {
  isSignup?: boolean;
};

export const Sign: React.FC<Props> = () => {
  return (
    <WithHeaderFooter>
      <h1>ログインしよう！</h1>
      <LoginForm signInSuccessUrl="/#/usertop" />
      <Link to="/">ホームへ戻る</Link>
    </WithHeaderFooter>
  );
};
