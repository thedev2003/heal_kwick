import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: '1d' }); // Token expires in 1 day
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null; // Return null if token is invalid or expired
  }
}