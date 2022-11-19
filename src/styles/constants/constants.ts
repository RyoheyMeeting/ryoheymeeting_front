export const FONT = {
  NOTO_SANS: '"Noto Sans JP"',
  ROBOTO: '"Roboto"',
  MOCHIY_POP_ONE: '"Mochiy Pop One"',
};

export const FONT_WEIGHT = {
  REGULAR: 400,
  BOLD: 700,
};

export const FONT_SIZE = {
  DEFAULT: "1.8rem",
  SMALL: "1.6rem",
  MEDIUM: "2.0rem",
  STRONG: "2.2rem",
};

export const COLLVO_POINT = {
  PLAIN_REACTION: 5,
  MESSAGE_REACTION: 5,
  RANKING: {
    one: 1000,
    two: 500,
    three: 300,
    other: 50,
  },
  MUTE_ACTION: {
    /**
     * 最大効果時間(秒)
     */
    MAX_DURATION: 30,
  },
  BOOST_ACTION: {
    /**
     * 効果時間(秒)
     */
    DURATION: 30,
    /**
     * ブーストアクション使用時の獲得コルボポイントの倍率
     */
    CP_MAG: 1.5,
  },
};

export const Z_INDEX = {
  /** 最小値 */
  MIN: -999,
  /** 背景系統 */
  BG: -500,
  /** 通常要素 */
  COMMON: 0,
  /** ヘッダー・サイドメニュー */
  HEADER: 1000,
  /** モーダル系統 */
  MODAL: 2000,
  /** Tips系統 */
  TIPS: 7000,
  /** 最大値 */
  MAX: 9999,
};

export const PRESENTATION_TIME = 25 * 60 * 1000; // 25分
