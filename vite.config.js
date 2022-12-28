import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function loadWebExtConfig() {
  try {
    return require("./.web-ext.config.json");
  } catch {
    return undefined;
  }
}

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

export default ({ mode }) => {

  // const env = loadEnv(mode, process.cwd(), ``);
  // Load app-level env vars to node-level env vars.
  // process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // https://vitejs.dev/config/
  return defineConfig({
    define: {
      // env: process.env,
      env: {mode},
    },
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        // '@services': `${path.resolve(__dirname, 'src/services')}/`,
      }
    },
    plugins: [
      vue(),
      webExtension({
        assets: "public",
        webExtConfig: loadWebExtConfig(),
        manifest: generateManifest,
      }),
    ],
  })
  
}
