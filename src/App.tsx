import { AdminRoute } from "components/Routing/AdminRoute/AdminRoute";
import { PrivateRoute } from "components/Routing/PrivateRoute/PrivateRoute";
import { useLoginListener } from "hooks/LoginHooks/useLoginListener";
import { useSetup } from "hooks/Setup/useSetup";
import { GrandPrixController } from "pages/Admin/GrandPrixController/GrandPrixController";
import { AdminTop } from "pages/Admin/Top/AdminTop";
import { GrandPrix } from "pages/GrandPrix/GrandPrix";
import { GrandPrixList } from "pages/GrandPrixList/GrandPrixList";
import { IdaiNaOkotoba } from "pages/IdaiNaOkotoba/IdaiNaOkotoba";
import { Live } from "pages/Live/Live";
import { Login } from "pages/Login/Login";
import { PortfolioList } from "pages/PortfolioList/PortfolioList";
import { Reaction } from "pages/Reaction/Reaction";
import { Shop } from "pages/Shop/Shop";
import { Top } from "pages/Top/Top";
import { UserSetting } from "pages/UserSetting/UserSetting";
import { UserTop } from "pages/UserTop/UserTop";
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

type Props = {};

export const App: React.FC<Props> = () => {
  useLoginListener();
  useSetup();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/usertop" element={<PrivateRoute component={UserTop} />} />
        <Route path="/usersetting" element={<PrivateRoute component={UserSetting} />} />
        <Route path="/shop" element={<PrivateRoute component={Shop} />} />
        <Route path="/portfoliolist" element={<PrivateRoute component={PortfolioList} />} />
        <Route path="/grandprixlist" element={<GrandPrixList />} />
        <Route path="/grandprix/:id" element={<GrandPrix />} />
        <Route path="/reaction/:id" element={<PrivateRoute component={Reaction} />} />
        <Route path="/live/:id" element={<PrivateRoute component={Live} />} />
        <Route path="/idaina-okotoba" element={<IdaiNaOkotoba />} />
        <Route path="/admin" element={<AdminRoute component={AdminTop} />} />
        <Route path="/admin/gpcontroller/:id" element={<AdminRoute component={GrandPrixController} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
