module.exports = {
  mode: "",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "black-80": "#03001E",
        "black-60": "#666666",
        "grey-40": "#E6E6E6",
        "grey-20": "#F4F4F4",
        eggplant: "#61045F",
        grape: "#7303C0",
        blueberry: "#40A6FF",
        persimmon: "#F25500",
        orange: "#FDA305",
        lemon: "#FFCC00",
        success: "#008800",
        error: "#E32E2E",
        compe: "#3C3A50",
      },
      spacing: {
        nav: "120px",
        '120': '30rem',
        '160': '40rem',
        '200': '50rem',
        '240': '60rem',
        '280': '70rem',
      },
      borderRadius: {
        button: "16px",
      },
      fontFamily: {
        norms: ["TT Norms Pro"],
        dm: ["DM Sans"],
      },
      height: {
        section: "44rem",
        compeMobile: "55rem",
        hero: "48rem",
        compeCard: "27.5rem",
        compeCardImg: "17rem",
        compeCardDesc: "10.5rem",

        eventBigCard: "39.5rem",
        eventSmallCard: "12.5rem",
        eventBigCardImg: "27.5rem",
        eventSmallCardImg: "7.6875rem",

        eventBigCardDesc: "12rem",
        eventSmallCardDesc: "4.8125rem",
      },
      width: {
        compeCard: "34.6875rem",
        eventBigCard: "46.5625rem",
        eventSmallCard: "22.8125rem",
      },
    },
  },
  minHeight: {
    eventSmallCard: "12.5rem",
    eventBigCard: "39.5rem",
  },
  maxHeight: {
    '40': '10rem',
    '80': '20rem',
    '120': '30rem',
    '160': '40rem',
    '200': '50rem',
    '240': '60rem',
    '280': '70rem',
  },
  maxWidth: {
    '40': '10rem',
    '80': '20rem',
    '120': '30rem',
    '160': '40rem',
    '200': '50rem',
    '240': '60rem',
    '280': '70rem',
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
