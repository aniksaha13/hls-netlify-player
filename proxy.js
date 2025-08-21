export async function handler(event) {
  try {
    const url = event.queryStringParameters?.url;
    if(!url) return {statusCode:400, body:"Missing URL parameter"};

    const res = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    return {
      statusCode: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/octet-stream",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET, HEAD, OPTIONS",
        "Access-Control-Expose-Headers":"*"
      },
      body: buffer.toString("base64"),
      isBase64Encoded:true
    };
  } catch(e){
    return {statusCode:500, body:"Proxy error: "+e.message};
  }
}