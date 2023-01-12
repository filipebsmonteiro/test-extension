import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function loadWebExtConfig() {
  try {
    // eslint-disable-next-line no-undef
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
  // https://vitejs.dev/config/
  return defineConfig({
    define: {
      _ENV: { mode },
    },
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@/": `${path.resolve(__dirname, "src")}/`,
        // '@services': `${path.resolve(__dirname, 'src/services')}/`,
      },
    },
    plugins: [
      vue(),
      webExtension({
        assets: "public",
        webExtConfig: loadWebExtConfig(),
        manifest: generateManifest,
      }),
    ],
  });
};
