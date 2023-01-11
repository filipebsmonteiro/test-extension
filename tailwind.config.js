/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: ["./popup/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    themes: [`dark`, `corporate`],
    darkTheme: "dark",
    // themes: true,
    //   styled: true,
    //   base: true,
    //   utils: true,
    //   logs: true,
    //   rtl: false,
    //   prefix: "",
  },
}