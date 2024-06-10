import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f1f5f9", //slate-100
        secondary: "#475569", //slate-600
        third: "#f8fafc", //slate-50
        fourth: "#38bdf8", //sky-400
        five: "#bfdbfe", //bg-blue-200
        form: "#0e7490",  //cyan-700
        accent: "#fde68a", //amber-200
        neutral: "#f5f5f5", //neutral-100
        info: "#059669", //emerald-600
        success: "#3b82f6", //blue-500
        warning: "#f59e0b", //amber-500
        error: "#ef4444", //red-500
      },
    },
  },
};
export default config;
