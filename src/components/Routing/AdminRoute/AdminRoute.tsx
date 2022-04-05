import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserRole } from "services/User/User";

type Props = {
  component: React.ComponentType;
  path?: string;
};

export const AdminRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const { isLogin, user, loading } = useSelector((state: RootState) => state.user);
  if (loading) {
    return <h1>ログイン中</h1>;
  }

  if (isLogin && user && user.role == UserRole.staff) {
    return <RouteComponent />;
  } else {
    return <Navigate to="/" />;
  }
};
