import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'c-red': '#BE123C',
        'c-gray': '#9CA3AF',
      },
      height: {
        '36-r': '36rem',
      },
    },
  },
  plugins: [],
};
export default config;
