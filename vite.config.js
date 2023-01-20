import { resolve } from "path";
import { defineConfig, normalizePath } from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";
import { viteStaticCopy } from "vite-plugin-static-copy";

function loadWebExtConfig() {
  try {
    // eslint-disable-next-line no-undef
    return require(`./.web-ext.config.json`);
  } catch {
    return undefined;
  }
}

function generateManifest() {
  const manifest = readJsonFile(`src/manifest.json`);
  const pkg = readJsonFile(`package.json`);
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

export default ({ mode }) => {
  // eslint-disable-next-line no-undef
  const Dir = __dirname;

  // https://vitejs.dev/config/
  return defineConfig({
    define: {
      _ENV: { mode },
      "process.env": { NODE_ENV: mode },
    },
    resolve: {
      alias: {
        vue:
          mode === `development`
            ? `vue/dist/vue.runtime.esm-browser.js`
            : `vue/dist/vue.runtime.esm-browser.prod.js`,
        "@/": `${resolve(Dir, `src`)}/`,
        "@app/": `${resolve(Dir, `src/application`)}/`,
        "@content/": `${resolve(Dir, `src/content-script`)}/`,
        "@extension/": `${resolve(Dir, `src/popup`)}/`,
      },
    },
    build: {
      minify: mode === `production`,
      emptyOutDir: true,
    },
    plugins: [
      vue(),
      webExtension({
        assets: `public`,
        webExtConfig: loadWebExtConfig(),
        manifest: generateManifest,
      }),
      viteStaticCopy({
        targets: [
          {
            src: normalizePath(resolve(Dir, `dist/main.css`)),
            dest: normalizePath(
              resolve(Dir, `dist/src/content-script/resources/assets`)
            ),
          },
        ],
      }),
    ],
  });
};
