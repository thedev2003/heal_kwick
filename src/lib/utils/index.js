import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import twilio from 'twilio';

// NEW: cn utility for shadcn/ui
export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

// --- Existing Twilio Logic ---
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function sendSms(to, body) {
	try {
		const message = await client.messages.create({
			body,
			from: twilioPhoneNumber,
			to,
		});
		console.log('SMS sent successfully:', message.sid);
		return message;
	} catch (error) {
		console.error('Failed to send SMS:', error);
		return null;
	}
}