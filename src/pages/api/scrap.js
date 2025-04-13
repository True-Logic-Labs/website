export const prerender = false;

/**
 * POST /api/fetchdom
 * Body: { "url": "https://example.com" }
 */
export async function POST({ request }) {
  const allowedDomains = ['example.com', 'mysite.com']; // ✅ Add allowed domains here

  let body;
  try {
    body = await request.json(); // Parse JSON body
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON in request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const targetUrl = body.url;

  // ✅ Basic URL validation
  if (!targetUrl) {
    return new Response(
      JSON.stringify({ error: 'Missing "url" in request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let hostname;
  try {
    hostname = new URL(targetUrl).hostname;
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Invalid URL format.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // // ✅ Check if domain is allowed
  // if (!allowedDomains.includes(hostname)) {
  //   return new Response(
  //     JSON.stringify({ error: `Domain "${hostname}" is not allowed.` }),
  //     { status: 403, headers: { 'Content-Type': 'application/json' } }
  //   );
  // }

  // ✅ Fetch HTML using native fetch
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AstroBot/1.0)', // Optional User-Agent
        'Accept': 'text/html,application/xhtml+xml', // Accept only HTML
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch URL. Status: ${response.status}` }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text(); // Get raw HTML

    return new Response(
      JSON.stringify({ html }), // Return HTML wrapped in JSON
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch the URL.', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
