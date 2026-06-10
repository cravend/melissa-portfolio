import type { APIContext, APIRoute } from "astro";

export function createMarkdownHandler(
  getBody: (context: APIContext) => Promise<string> | string
): APIRoute {
  return async (context) => {
    const body = await getBody(context);
    return new Response(body, { status: 200 });
  };
}
