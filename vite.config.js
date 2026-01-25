import { defineConfig } from "vite";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

const themePath = path.resolve("wp-content/themes/onemohrstore");

export default defineConfig({
  root: themePath,
  base: "./",

  build: {
    outDir: "assets",
    manifest: true,
    emptyOutDir: true,

    rollupOptions: {
      external: ["@floating-ui/dom"],
      input: {
        app: path.resolve(themePath, "src/scripts/app.js"),
        styles: path.resolve(themePath, "src/styles/app.scss"),
      },
      output: {
        entryFileNames: "js/app.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "css/app.css";
          }
          return "img/[name][extname]";
        },
      },
    },
  },

  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(themePath, "src/images/**/*"),
          dest: "img",
        },
      ],
    }),
  ],
});

// import { defineConfig } from "vite";
// import path from "path";

// const themePath = path.resolve(
//   "wp-content/themes/onemohrstore"
// );

// export default defineConfig(({ mode }) => ({
//   root: themePath,

//   base: "./",

//   build: {
//     outDir: "assets",
//     emptyOutDir: true,
//     manifest: true,

//     rollupOptions: {
//       input: {
//         app: path.resolve(themePath, "src/scripts/app.js"),
//         styles: path.resolve(themePath, "src/styles/app.scss"),
//       },
//       output: {
//         entryFileNames: mode === "production"
//           ? "js/[name].[hash].js"
//           : "js/[name].js",
//         assetFileNames: ({ name }) =>
//           name && name.endsWith(".css")
//             ? mode === "production"
//               ? "css/[name].[hash][extname]"
//               : "css/[name][extname]"
//             : "img/[name][extname]",
//       },
//     },
//   },
// }));
