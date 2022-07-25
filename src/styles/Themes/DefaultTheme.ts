import {
  BLUE_40,
  BLUE_90,
  BLUE_GRAY_60,
  GRAY_10,
  GRAY_20,
  GRAY_50,
  GRAY_80,
  GRAY_90,
  LARGE_SHADOW,
  ORANGE_50,
  RED_40,
  YELLOW_40,
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
      bg: BLUE_40,
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
  nextPresenter: {
    bg: GRAY_80,
  },
  presenterIcon: {
    bg: GRAY_80,
    timerBg: GRAY_50,
  },
  actionButton: {
    muting: {
      bg: GRAY_50,
    },
    disabled: {
      bg: BLUE_GRAY_60,
    },
  },
  presentation: {
    bg: BLUE_90,
  },
  messageWindow: {
    bg: GRAY_10,
    counter: GRAY_50,
  },
};
