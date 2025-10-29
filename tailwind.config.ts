import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./content/**/*.{md,mdx}", "./lib/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Merriweather", "ui-serif"],
        mono: ["JetBrains Mono", "ui-monospace"]
      },
      colors: {
        emerald: {
          50: "#ecfdf7",
          100: "#cff6e7",
          200: "#a0ead0",
          300: "#70ddb8",
          400: "#41d0a1",
          500: "#0ea47a",
          600: "#0b8260",
          700: "#086146",
          800: "#05302f",
          900: "#03201f"
        },
        ink: {
          50: "#f7f7f8",
          100: "#ececf0",
          200: "#dcdce3",
          300: "#c0c1cd",
          400: "#9293a6",
          500: "#6b6d82",
          600: "#4b4d63",
          700: "#323347",
          800: "#1f1f2d",
          900: "#13141c"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
export default config;
