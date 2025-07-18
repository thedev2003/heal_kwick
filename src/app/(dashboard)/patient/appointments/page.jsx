import { AppointmentForm } from '@/components/forms/AppointmentForm';

export default function BookAppointmentPage() {
	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Book a New Appointment</h1>
			<p className="mb-4">Please fill out the form below to request an appointment.</p>
			<AppointmentForm />
		</div>
	);
}