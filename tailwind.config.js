import fs from "node:fs";
import path from "node:path";

const collectSourceFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.name.includes("(")) {
      return [];
    }

    if (entry.isDirectory()) {
      return collectSourceFiles(entryPath);
    }

    return /\.(ts|tsx)$/.test(entry.name) ? [`./${entryPath.replace(/\\/g, "/")}`] : [];
  });

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", ...collectSourceFiles("src")],
  theme: {
    extend: {
      colors: {
        cinema: {
          black: "#0A0A0A",
          surface: "#141414",
          navy: "#0B1020",
          gold: "#D4AF37",
          silver: "#B8B8B8",
          blue: "#6AA9FF",
        },
      },
      boxShadow: {
        poster: "0 30px 80px rgba(0, 0, 0, 0.55)",
        gold: "0 0 0 1px rgba(212, 175, 55, 0.35), 0 20px 60px rgba(212, 175, 55, 0.08)",
      },
    },
  },
  plugins: [],
};
