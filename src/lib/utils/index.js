import twilio from 'twilio';

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
		// In a real app, you might want to throw the error
		// or handle it in a more sophisticated way.
		return null;
	}
}