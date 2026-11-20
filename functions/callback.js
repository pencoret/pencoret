export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  const response = await fetch('https://github.com', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const result = await response.json();
  const status = result.error ? 'error' : 'success';
  const content = result.error ? JSON.stringify(result) : JSON.stringify({ token: result.access_token, provider: 'github' });

  return new Response(
    `<!doctype html><html><body><script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage('authorization:github:${status}:' + '${content}', e.origin);
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script></body></html>`,
    { headers: { 'content-type': 'text/html;charset=UTF-8' } }
  );
}
 
