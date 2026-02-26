// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
import { defineConfig } from "astro/config";


import sanity from "@sanity/astro";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel";


const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET;

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [
    sanity({
      projectId,
      dataset,
      // studioBasePath: "/admin",
      useCdn: false,
      // `false` if you want to ensure fresh data
      apiVersion: "2026-02-26", // Set to date of setup to use the latest API version
    }),
    react(), // Required for Sanity Studio
  ],
});
