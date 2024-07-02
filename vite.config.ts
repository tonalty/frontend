import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { UserConfig, defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [react(), nodePolyfills()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    }
  };
  if (mode === 'development') {
    config.server = {
      https: {
        key: fs.readFileSync('../localhost.direct.key'),
        cert: fs.readFileSync('../localhost.direct.crt')
      },
      host: 'tonalty.localhost.direct'
    };
  }
  return config;
});
