import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Button } from "components/Button/Button";
import { Cog, SignInAlt, UserAlt, UserPlus } from "components/icons";
import { WithHeaderFooter } from "components/Layout/WithHeaderFooter/WithHeaderFooter";
import { TileBack } from "components/TileBack/TileBack";
import { UserRole } from "services/User/User";
import { MainStyle } from "./TopStyle";

type Props = {};

export const Top: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { user, isLogin } = useSelector((state: RootState) => state.user);

  return (
    <WithHeaderFooter>
      <TileBack type="default">
        <MainStyle>
          <div className="top_flow">
            <div className="top_flow_blur" />
            <span className="top_title">ようこそ、遼平会へ</span>
            <span className="top_description">
              遼平会に参加して実績を報告しましょう。
              <br />
              実績に応じて様々な恩恵を受けることが出来ます。
            </span>
            <div className="top_panel_button">
              {isLogin ? (
                <>
                  <Button
                    value="ユーザートップに移動する！"
                    iconPlace="left"
                    Icon={UserAlt}
                    color="orange"
                    size="M"
                    mode="default"
                    onClick={() => navigate("/usertop")}
                  />
                  {user?.role === UserRole.staff && (
                    <Button
                      value="管理者TOP"
                      iconPlace="left"
                      Icon={Cog}
                      color="white"
                      size="M"
                      mode="default"
                      onClick={() => navigate("/admin")}
                    />
                  )}
                </>
              ) : (
                <>
                  <Button
                    value="ログインする！"
                    iconPlace="left"
                    Icon={SignInAlt}
                    color="white"
                    size="M"
                    mode="default"
                    onClick={() => navigate("/login")}
                  />
                  <Button
                    value="新規登録する！"
                    iconPlace="left"
                    Icon={UserPlus}
                    color="orange"
                    size="M"
                    mode="default"
                    onClick={() => navigate("/register")}
                  />
                </>
              )}
            </div>
          </div>
        </MainStyle>
      </TileBack>
    </WithHeaderFooter>
  );
};
