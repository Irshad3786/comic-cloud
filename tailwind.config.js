/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}',"./screens/**/*.{js,jsx,ts,tsx}", './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        // Anybody
        anybody: ["AnybodyRegular"],
        "anybody-medium": ["AnybodyMedium"],
        "anybody-bold": ["AnybodyBold"],
        "anybody-bolditalic": ["AnybodyBoldItalic"],

        // JetBrains Mono
        mono: ["JetBrainsMonoRegular"],
        "mono-medium": ["JetBrainsMonoMedium"],
        "mono-bold": ["JetBrainsMonoBold"],
        "mono-italic": ["JetBrainsMonoItalic"],
      },
    },
  },
  plugins: [],
};
