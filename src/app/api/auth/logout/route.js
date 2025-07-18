import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		// Clear the token cookie
		cookies().set('token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: -1, // Expire the cookie immediately
			path: '/',
		});

		return NextResponse.json({ message: 'Logout successful.' }, { status: 200 });
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json({ message: 'An error occurred during logout.' }, { status: 500 });
	}
}