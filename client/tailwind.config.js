module.exports = {
  mode: "jit",
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
      },
      width: {
        compeCard: "34.6875rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};