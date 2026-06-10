import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = ".vercel/output";
const funcDir = join(outputDir, "functions/middleware.func");

mkdirSync(funcDir, { recursive: true });

const middlewareSource = `export default async function middleware(request) {
  const accept = request.headers.get("accept") || "";
  if (!/text\\/markdown/i.test(accept)) return;

  const url = new URL(request.url);
  if (url.pathname.endsWith(".md")) return;

  const mdPath =
    url.pathname === "/"
      ? "/index.md"
      : url.pathname.replace(/\\/$/, "") + ".md";
  url.pathname = mdPath;

  const mdResponse = await fetch(url, { headers: { accept: "*/*" } });
  if (!mdResponse.ok) return;

  const body = await mdResponse.text();
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      vary: "Accept",
    },
  });
}
`;

writeFileSync(join(funcDir, "middleware.js"), middlewareSource);
writeFileSync(
  join(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "edge",
      entrypoint: "middleware.js",
    },
    null,
    2
  )
);

const configPath = join(outputDir, "config.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));

if (!config.routes.some((route) => route.handle === "middleware")) {
  const filesystemIndex = config.routes.findIndex(
    (route) => route.handle === "filesystem"
  );
  const middlewareRoute = { handle: "middleware" };

  if (filesystemIndex >= 0) {
    config.routes.splice(filesystemIndex, 0, middlewareRoute);
  } else {
    config.routes.unshift(middlewareRoute);
  }

  writeFileSync(configPath, `${JSON.stringify(config, null, "\t")}\n`);
}

console.log("Injected markdown content-negotiation middleware into Vercel output");
