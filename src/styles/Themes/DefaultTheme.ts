import {
  LIGHTBLUE_40,
  GRAY_10,
  GRAY_20,
  GRAY_50,
  GRAY_90,
  LARGE_SHADOW,
  ORANGE_50,
  RED_40,
  YELLOW_40,
  GRAY_60,
} from "styles/colors";

export const DefaultTheme = {
  global: {
    base: GRAY_20,
    main: ORANGE_50,
    font: GRAY_90,
    negative: GRAY_10,
  },
  stamp: {
    deactive: GRAY_50,
  },
  message: {
    bg: GRAY_10,
    shadow: LARGE_SHADOW,
  },
  reactionBubble: {
    blue: {
      bg: LIGHTBLUE_40,
    },
    yellow: {
      bg: YELLOW_40,
    },
    red: {
      bg: RED_40,
    },
  },
  toggle: {
    icon: GRAY_10,
  },
  ONAIR: {
    font: GRAY_10,
  },
  messageNotification: {
    bg: GRAY_50,
  },
  presenterIcon: {
    bg: GRAY_90,
    timerBg: GRAY_50,
  },
  actionButton: {
    ready: {
      font: GRAY_10,
      bg: GRAY_90,
    },
    doing: {
      font: GRAY_10,
      bg: ORANGE_50,
    },
    disabled: {
      font: GRAY_50,
      bg: GRAY_60,
    },
  },
};
