export async function onRequest(context) {
  const { request, env } = context;
  const client_id = env.GITHUB_CLIENT_ID;
  const url = new URL(request.url);
  const redirectUrl = new URL('https://github.com');
  redirectUrl.searchParams.set('client_id', client_id);
  redirectUrl.searchParams.set('redirect_uri', url.origin + '/callback');
  redirectUrl.searchParams.set('scope', 'repo user');
  return Response.redirect(redirectUrl.href, 302);
}
 
