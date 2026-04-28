export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("Relay is running", { status: 200 });
    }
    const authKey = request.headers.get("X-Auth-Key");
    if (authKey !== "7799aabb88cc") {
      return new Response("Unauthorized", { status: 401 });
    }
    let targetUrl;
    try {
      const body = await request.json();
      targetUrl = body.url;
    } catch (e) {
      return new Response("Bad Request", { status: 400 });
    }
    if (!targetUrl) {
      return new Response("Bad Request", { status: 400 });
    }
    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers
      });
      return response;
    } catch (e) {
      return new Response(e.message, { status: 502 });
    }
  }
};
