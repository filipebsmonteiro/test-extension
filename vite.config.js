import path from "path";
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
  // https://vitejs.dev/config/
  return defineConfig({
    define: {
      _ENV: { mode },
    },
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@/": `${path.resolve(__dirname, `src`)}/`,
        // '@services': `${path.resolve(__dirname, 'src/services')}/`,
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
            // eslint-disable-next-line no-undef
            src: normalizePath(path.resolve(__dirname, `./dist/main.css`)),
            dest: normalizePath(
              // eslint-disable-next-line no-undef
              path.resolve(__dirname, `./dist/src/content-script`)
            ),
          },
        ],
      }),
    ],
  });
};
