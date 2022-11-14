import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase_config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";

export const useSignState = (isSignup: boolean) => {
  const { isLogin } = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/usertop");
    }
  }, [isLogin]);

  const signInEmail = useCallback(async () => {
    signInWithEmailAndPassword(getAuth(), email, password);
  }, [email, password]);

  const signInGoogle = useCallback(async () => {
    await signInWithPopup(getAuth(), new GoogleAuthProvider());
  }, []);

  const signInAnonymous = useCallback(async () => {
    await signInAnonymously(getAuth());
  }, []);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }, []);

  const onClickOther = async () => {
    if (isSignup) {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };

  //画面幅の計算
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    email,
    password,
    signInEmail,
    signInGoogle,
    signInAnonymous,
    onChangeEmail,
    onChangePassword,
    onClickOther,
    windowDimensions,
  };
};
