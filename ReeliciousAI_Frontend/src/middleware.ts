import { NextAuthRequest, Session } from 'next-auth';
import {
  AUTH_API_PREFIX,
  AUTH_ROUTES,
  DEFAULT_AUTH_PAGE,
  DEFAULT_AUTH_REDIRECT,
  PUBLIC_ROUTES,
} from './routes';



export default async (req: NextAuthRequest) => {
  const { cookies, nextUrl } = req;
  if (nextUrl.pathname == "/api/auth/validate-session") {
    return 
  }
  let authenticated = false
  const response = await fetch(`${req.nextUrl.origin}/api/auth/validate-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'cookie': cookies.toString()
    },
    credentials: 'include'
  });
  if (response.ok) {
    const session: Session = await response.json()
    if (session) {
      authenticated = true
    }
  }

  const isPublic = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isAuthApi = nextUrl.pathname.startsWith(AUTH_API_PREFIX);
  if (isAuthApi) return;
  if (authenticated && (isPublic || isAuthRoute)) {
    return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl));
  }
  if (!authenticated && !(isAuthRoute || isPublic)) {
    return Response.redirect(new URL(DEFAULT_AUTH_PAGE, nextUrl));
  }
  return;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
