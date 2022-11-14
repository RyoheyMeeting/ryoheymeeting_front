import React from "react";
import { LogoSquareStyle, SignStyle } from "./SignStyle";
import { BackLink } from "components/BackLink/BackLink";
import { LongButton } from "./components/LongButton/LongButton";
import { Googleicon, SignInAlt, UserCircle, UserPlus } from "components/icons";
import { useSignState } from "./hooks/useSignState";

type Props = {
  isSignup?: boolean;
};

export const Sign: React.FC<Props> = ({ isSignup = false }) => {
  const {
    // email,
    // password,
    // signInEmail,
    signInGoogle,
    signInAnonymous,
    // onChangeEmail,
    // onChangePassword,
    onClickOther,
    windowDimensions,
  } = useSignState(isSignup);

  return (
    <SignStyle>
      <div className="sign_backlink">
        <BackLink to="/" color={windowDimensions.width > 1000 ? "white" : "orange"} />
      </div>
      <div className="sign_panel_left">
        遼平会！！
        <br />
        バンザイ！
      </div>
      <div className="sign_panel_right">
        <div className="sign_panel_wrapper">
          <LogoSquareStyle src="/img/logo_square.svg" wrapper="svg" />
          <span className="sign_title">ようこそ、遼平会へ</span>
          <span className="sign_description">
            {isSignup ? (
              <>はじめまして、ユーザ登録をして遼平会を楽しみましょう</>
            ) : (
              <>
                ログインしてあなたの実績を遼平会に報告しましょう。
                <br />
                実績に応じて様々な恩恵を受けることが出来ます。
              </>
            )}
          </span>
          <LongButton
            Icon={Googleicon}
            value={isSignup ? "Googleアカウントで始める" : "Googleアカウントでログイン"}
            priority="tertiary"
            onClick={signInGoogle}
          />
          <LongButton
            Icon={UserCircle}
            value={isSignup ? "匿名で始める" : "匿名でログイン"}
            priority="tertiary"
            onClick={signInAnonymous}
          />
          {/* <span className="sign_or_bar">
            <div className="sign_bar" />
            <span className="sign_or">or</span>
            <div className="sign_bar" />
          </span>
          <InputText type="text" value={email} placeholder="Email" Icon={Email} onChange={onChangeEmail} />
          <InputText type="password" value={password} placeholder="Password" Icon={VpnKey} onChange={onChangePassword} /> */}
          {/* <LongButton
            Icon={isSignup ? SignInAlt : UserPlus}
            value={isSignup ? "新規登録" : "ログイン"}
            priority="primary"
            onClick={signInEmail}
          /> */}
          <LongButton
            Icon={isSignup ? UserPlus : SignInAlt}
            value={isSignup ? "ログイン" : "新規登録"}
            priority="secondary"
            onClick={onClickOther}
          />
        </div>
      </div>
    </SignStyle>
  );
};
