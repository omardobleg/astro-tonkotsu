// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import inoxToolsRuntimeLogger from "@inox-tools/runtime-logger";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [inoxToolsRuntimeLogger()],
  adapter: node({
    mode: "standalone",
  }),
  env: {
    schema: {
      TEABLE_TOKEN: envField.string({
        context: "server",
        access: "secret",
        default: "",
      }),
    },
  },
});
