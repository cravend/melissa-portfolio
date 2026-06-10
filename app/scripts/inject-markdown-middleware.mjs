import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = ".vercel/output";
const funcDir = join(outputDir, "functions/_middleware.func");

mkdirSync(funcDir, { recursive: true });

const middlewareSource = `function passThrough() {
  const response = new Response();
  response.headers.set("x-middleware-next", "1");
  return response;
}

export default function middleware(request) {
  const accept = request.headers.get("accept") || "";
  if (!/text\\/markdown/i.test(accept)) return passThrough();

  const url = new URL(request.url);
  if (
    url.pathname.startsWith("/_astro/") ||
    url.pathname.endsWith(".md") ||
    /\\.(css|js|png|jpe?g|gif|svg|ico|webp|woff2?|ttf|eot|xml|txt|json)$/i.test(
      url.pathname
    )
  ) {
    return passThrough();
  }

  const mdPath =
    url.pathname === "/"
      ? "/index.md"
      : url.pathname.replace(/\\/$/, "") + ".md";

  const response = new Response();
  response.headers.set("x-middleware-rewrite", mdPath);
  response.headers.set("vary", "Accept");
  return response;
}
`;

writeFileSync(join(funcDir, "index.js"), middlewareSource);
writeFileSync(
  join(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "edge",
      entrypoint: "index.js",
    },
    null,
    2
  )
);

const configPath = join(outputDir, "config.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));

const middlewareRoute = {
  src: "/(.*)",
  middlewarePath: "_middleware",
  continue: true,
};

const alreadyInjected = config.routes.some(
  (route) => route.middlewarePath === "_middleware"
);

if (!alreadyInjected) {
  const filesystemIndex = config.routes.findIndex(
    (route) => route.handle === "filesystem"
  );

  if (filesystemIndex >= 0) {
    config.routes.splice(filesystemIndex, 0, middlewareRoute);
  } else {
    config.routes.unshift(middlewareRoute);
  }

  writeFileSync(configPath, `${JSON.stringify(config, null, "\t")}\n`);
}

console.log("Injected markdown content-negotiation middleware into Vercel output");
