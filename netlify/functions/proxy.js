// netlify/functions/proxy.js
export async function handler(event) {
  try {
    const url = event.queryStringParameters?.url;
    if (!url) return { statusCode: 400, body: "Missing URL parameter" };

    const res = await fetch(url);
    const text = await res.text(); // Base64 নয়, সরাসরি পাঠানো

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Expose-Headers": "*"
      },
      body: text
    };
  } catch (e) {
    return { statusCode: 500, body: "Proxy error: " + e.message };
  }
}
