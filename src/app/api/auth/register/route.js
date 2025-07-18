import connectDB from '@/lib/db/connect';
import User from '@/lib/db/models/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		await connectDB();

		const { name, email, password, phone } = await request.json();

		if (!name || !email || !password) {
			return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			phone,
		});

		await newUser.save();

		return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
	} catch (error) {
		console.error('Registration error:', error);
		return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
	}
}