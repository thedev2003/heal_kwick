import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth/jwt';

export async function middleware(request) {
	const token = request.cookies.get('token')?.value;
	const { pathname } = request.nextUrl;

	const decodedToken = token ? await verifyToken(token) : null;

	// Redirect to login if no token and trying to access a protected route
	if (!decodedToken) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// Add user info to the request headers to be accessed in server components
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-user-id', decodedToken.id);
	requestHeaders.set('x-user-email', decodedToken.email);
	requestHeaders.set('x-user-role', decodedToken.role);

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/admin/:path*', '/patient/:path*'],
};