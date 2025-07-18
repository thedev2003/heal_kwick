import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/user';
import { signToken } from '@/lib/auth/jwt';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
	try {
		await connectDB();

		const { email, password } = await request.json();

		if (!email || !password) {
			return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
		}

		const tokenPayload = {
			id: user._id,
			email: user.email,
			role: user.role,
		};

		const token = signToken(tokenPayload);

		// Set the token in a secure, httpOnly cookie
		cookies().set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24, // 1 day
			path: '/',
		});

		return NextResponse.json({ message: 'Login successful.' }, { status: 200 });
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json({ message: 'An error occurred during login.' }, { status: 500 });
	}
}