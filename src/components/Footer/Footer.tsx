import React, { MouseEventHandler } from "react";
import { ArrowUp } from "components/icons";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { FooterStyle } from "./FooterStyle";

type Props = {
  onClickTop?: MouseEventHandler<HTMLButtonElement>;
};

export const Footer: React.FC<Props> = ({ onClickTop }) => {
  const theme = useTheme();

  return (
    <FooterStyle>
      <button className="footer_top" onClick={onClickTop}>
        <ArrowUp fill={theme.global.negative} size="24px" />
        <span>Top</span>
      </button>
      <div className="footer_main">
        <div className="footer_panel_left">
          <img src="/img/ryoheykai_icon.png" alt="遼平会アイコン" className="footer_icon" />
        </div>
        <div className="footer_panel_center">
          <div className="footer_links">
            <Link to="/" className="footer_link">
              ホーム
            </Link>
            <Link to="/shop" className="footer_link">
              ショップ
            </Link>
            <Link to="/grandprixlist" className="footer_link">
              グランプリ一覧
            </Link>
          </div>
          <div className="footer_links">
            <Link to="/usertop" className="footer_link">
              ユーザトップ
            </Link>
            <Link to="/portfoliolist" className="footer_link">
              ポートフォリオ一覧
            </Link>
          </div>
          <div className="footer_links">
            <Link to="/idaina-okotoba" className="footer_link footer_idai">
              遼平下からの偉大なお言葉
            </Link>
          </div>
        </div>
        <div className="footer_panel_right">
          <img src="/img/collvo_teamdisk.png" alt="COLLVOチームディスク" className="footer_disk" />
        </div>
      </div>
      <span className="footer_copyright">Copyright by COLLVO</span>
    </FooterStyle>
  );
};
