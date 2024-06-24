/** @format */

import type { Config } from "tailwindcss";
import colors from "./src/utils/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        linear:
          "linear-gradient(77deg, rgba(10,38,64,1) 16%, rgba(28,61,91,1) 79%)",
        login: "url('/images/bg/login.webp')",
      },
      colors,
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        sacramento: ["Sacramento", "cursive"],
      },
      textShadow: {
        default: "2px 2px 4px rgba(0, 0, 0)",
        md: "3px 3px 6px rgba(0, 0, 0)",
        lg: "5px 5px 10px rgba(0, 0, 0)",
        xl: "7px 7px 14px rgba(0, 0, 0)",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
export default config;
