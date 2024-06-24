import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: ((process.env.GITHUB_REPOSITORY ?? "") + "/").match(/(\/.*)/)?.[1],
  server: {
    https: {
      key: fs.readFileSync("../localhost.direct.key"),
      cert: fs.readFileSync("../localhost.direct.crt"),
    },
    host: "tonalty.localhost.direct",
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
