export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.pathname.startsWith("/admin")) {
    return new Response("Not Found", { status: 404 });
  }

  return context.next();
}
