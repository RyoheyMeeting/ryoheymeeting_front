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
  BLUE_GRAY_80,
  LIGHTBLUE_30,
  GRAY_80,
  WHITE,
  ORANGE_20,
  ORANGE_10,
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
    orange: {
      font: ORANGE_50,
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
    orange: ORANGE_30,
  },
  navIconText: {
    active: ORANGE_30,
    hoverBG: GRAY_20,
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
  footer: {
    bg: BLUE_GRAY_80,
    darkFont: GRAY_55,
  },
  sideMenu: {
    bg: GRAY_30,
    bar: GRAY_30,
    active: {
      font: ORANGE_30,
    },
  },
  userMenu: {
    link: LIGHTBLUE_30,
    bar: GRAY_30,
    hoverBG: GRAY_20,
  },
  withHeaderFooter: {
    overlay: GRAY_80,
  },
  top: {
    description: GRAY_50,
  },
  longButton: {
    gray: GRAY_50,
    negative: WHITE,
  },
  inputText: {
    placeholder: ORANGE_20,
    deactive: {
      bg: ORANGE_10,
      font: ORANGE_30,
    },
    negative: WHITE,
  },
  sign: {
    description: GRAY_50,
    or: GRAY_40,
    negative: WHITE,
  },
  grandPrixCard: {
    tag: {
      yet: BLUE_70,
      doing: BLUE_70,
      done: GRAY_50,
    },
    yet: {
      bg: ORANGE_50,
      font: GRAY_10,
      fontGray: ORANGE_20,
      active: {
        border: BLUE_70,
      },
    },
    doing: {
      bg: ORANGE_50,
      font: GRAY_10,
      fontGray: ORANGE_20,
      active: {
        border: BLUE_70,
      },
    },
    done: {
      bg: GRAY_10,
      font: GRAY_80,
      fontGray: GRAY_55,
      border: GRAY_30,
      active: {
        border: ORANGE_50,
      },
    },
  },
  grandPrixTop: {
    presenterName: GRAY_55,
  },
  result: {
    font: WHITE,
    grayFont: GRAY_55,
    bg: "#26282D",
    border: "#32343A",
    sideBand: "33363F",
    wing: "#F7D54F",
    psycho: "#F2DF63",
    wait: "#63A6F2",
    good: "#ED4779",
    ranking: {
      border: GRAY_50,
    },
    first: {
      surface: "#F7D54F",
      shadow: "#B38114",
    },
    second: {
      surface: "#DADADA",
      shadow: "#818181",
    },
    third: {
      surface: "#C88A2F",
      shadow: "#876531",
    },
  },
};
