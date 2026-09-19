export default {
  name: 'cpp-compiler',
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST requests to /compile
    if (url.pathname === '/compile' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { code, input, language } = body;

        if (!code) {
          return new Response(JSON.stringify({ error: 'Code is required' }), {
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        // Prepare request to OnlineCompiler API
        const apiResponse = await fetch('https://api.onlinecompiler.io/compile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'd8ccf90459970a7e6c4ef639d3dd35ae',
          },
          body: JSON.stringify({
            code: code,
            input: input || '',
            language: language || 'cpp',
          }),
        });

        const result = await apiResponse.json();

        return new Response(JSON.stringify(result), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Default response for other routes
    return new Response('C++ Compiler Worker - Use POST /compile', {
      headers: { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
