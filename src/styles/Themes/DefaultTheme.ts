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
  BLUE_GRAY_90,
  BLUE_GRAY_70,
  RED_30,
  GRAY_100,
  GRAY_40,
  BLUE_90,
  BLUE_70,
  BLUE_GRAY_60,
  BLUE_GRAY_85,
  GRAY_65,
  GRAY_55,
  ORANGE_30,
  GRAY_30,
  ORANGE_70,
  BLUE_GRAY_50,
  GRAY_25,
  MAGENTA_70,
  MAGENTA_50,
} from "styles/colors";

export const DefaultTheme = {
  global: {
    base: GRAY_20,
    main: ORANGE_50,
    font: GRAY_90,
    negative: GRAY_10,
  },
  skeleton: GRAY_40,
  stamp: {
    deactive: GRAY_50,
    black: GRAY_90,
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
  nextPresenter: {
    bg: GRAY_90,
    font: GRAY_10,
  },
  backLink: {
    white: {
      font: GRAY_10,
    },
  },
  stampMessage: {
    bg: GRAY_90,
  },
  reactionMeter: {
    meterBg: BLUE_GRAY_90,
    bg: BLUE_GRAY_70,
    border: GRAY_100,
    psycho: {
      meter: YELLOW_40,
    },
    wait: {
      meter: LIGHTBLUE_40,
    },
    good: {
      meter: RED_30,
    },
  },
  reactionMeters: {
    bg: GRAY_100,
  },
  sendableStamp: {
    border: BLUE_70,
    button: BLUE_90,
    overlay: GRAY_60,
  },
  stampPallete: {
    bg: BLUE_GRAY_60,
  },
  messageReactionForm: {
    bg: GRAY_90,
    textarea: BLUE_GRAY_85,
    font: GRAY_65,
    disabled: {
      button: GRAY_55,
      font: GRAY_40,
    },
  },
  live: {
    frame: {
      base: GRAY_100,
      border: BLUE_GRAY_60,
    },
  },
  iconText: {
    hover: GRAY_20,
    active: {
      font: ORANGE_30,
    },
  },
  button: {
    white: {
      bg: GRAY_30,
      surface: GRAY_10,
      font: ORANGE_50,
    },
    orange: {
      bg: ORANGE_70,
      surface: ORANGE_50,
      font: GRAY_10,
    },
    blueBlack: {
      bg: BLUE_90,
      surface: BLUE_70,
      font: GRAY_10,
    },
    darkBlueBlack: {
      bg: GRAY_100,
      surface: BLUE_90,
      font: GRAY_10,
    },
    gray: {
      bg: GRAY_50,
      surface: GRAY_40,
      font: GRAY_25,
    },
    darkGray: {
      bg: BLUE_GRAY_60,
      surface: BLUE_GRAY_50,
      font: GRAY_55,
    },
    red: {
      bg: MAGENTA_70,
      surface: MAGENTA_50,
      font: GRAY_10,
    },
  },
  header: {
    bar: GRAY_30,
  },
};
