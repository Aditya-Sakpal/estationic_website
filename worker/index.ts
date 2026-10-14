// The site is static files. This answers byte ranges for the film, which the
// static asset server does not: Safari plays a video only from 206 answers,
// and seeking in any browser asks for a later window of the file.

interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> };
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const range = req.headers.get("range");
    const plain = new Request(req.url, { method: req.method });
    const res = await env.ASSETS.fetch(plain);
    if (!res.ok || !new URL(req.url).pathname.startsWith("/video/")) return res;

    const headers = new Headers(res.headers);
    headers.set("accept-ranges", "bytes");
    headers.set("cache-control", "public, max-age=86400");
    const m = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!m) return new Response(res.body, { status: 200, headers });

    const body = await res.arrayBuffer();
    const size = body.byteLength;
    let start = m[1] === "" ? size - Number(m[2]) : Number(m[1]);
    const end = m[1] === "" || m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
    if (m[1] === "" && m[2] === "") start = size;
    if (start < 0) start = 0;
    if (start >= size || start > end) {
      headers.set("content-range", `bytes */${size}`);
      headers.delete("content-length");
      return new Response(null, { status: 416, headers });
    }
    headers.set("content-range", `bytes ${start}-${end}/${size}`);
    headers.set("content-length", String(end - start + 1));
    return new Response(req.method === "HEAD" ? null : body.slice(start, end + 1), { status: 206, headers });
  },
};
