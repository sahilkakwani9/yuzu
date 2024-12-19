import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yellow: "#F9E92B",
      },
      fontFamily: {
        saira: ["var(--font-saira)"],
      },
      backgroundImage: {
        landing: 'url("/landing.webp")',
        gradientt: 'url("/gradient.webp")',
      },
    },
  },
  plugins: [],
} satisfies Config;
