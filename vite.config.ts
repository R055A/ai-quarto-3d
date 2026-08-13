import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  base: "./",

  build: {
    target: "es2022",
    sourcemap: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "three",
              test: /node_modules[\\/]three[\\/]/,
              priority: 20,
            },
            {
              name: "vendor",
              test: /node_modules/,
              priority: 10,
            },
          ],
        },
      },
    },
  },

  plugins: [intlayer()],
});
