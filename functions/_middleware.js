export async function onRequest(context) {
  const url = new URL(context.request.url);

  const blocked =
    (context.env.BLOCKED_PATHS || "")
      .split(",")
      .map(p => p.trim())
      .filter(Boolean);

  if (blocked.some(path => url.pathname.startsWith(path))) {
    const res = await fetch(new URL("/404.html", url.origin));
    return new Response(res.body, {
      status: 404,
      headers: res.headers,
    });
  }

  return context.next();
}
