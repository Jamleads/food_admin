/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theGreen: "#354231",
        theSubGreen: "#A8CC45",

        primary: {
          mainBlue: "#000c35",
          mainGreen: "#079649",
          testRed: "#ff0000",
        },
        secondary: {
          gray: "#f1f5f9",
          blue: "#acbdd2",
        },
      },
    },
  },
  plugins: [],
};
