import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  component: React.ComponentType;
  path?: string;
};

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const { isLogin, loading } = useSelector((state: RootState) => state.user);

  if (loading) {
    return <h1>ログイン中</h1>;
  }

  if (isLogin) {
    return <RouteComponent />;
  } else {
    return <Navigate to="/" />;
  }
};
