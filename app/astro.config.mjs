import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET;

export default defineConfig({
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: "2026-02-26",
    }),
    react(),
  ],
});
