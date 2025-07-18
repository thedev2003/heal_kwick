import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<main className="flex-grow container mx-auto px-4 py-8">
				<section className="text-center mb-16">
					<h1 className="text-4xl font-bold mb-4">
						Welcome to Health Kwick
					</h1>
					<p className="text-xl text-gray-600 mb-8">
						Modern Healthcare Management System
					</p>
					<div className="flex gap-4 justify-center">
						<Link
							href="/login"
							className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
						>
							Login
						</Link>
						<Link
							href="/register"
							className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50"
						>
							Register
						</Link>
					</div>
				</section>

				<section className="grid md:grid-cols-3 gap-8">
					{/* Feature cards */}
					<div className="p-6 border rounded-lg">
						<h3 className="font-bold mb-2">Easy Appointments</h3>
						<p className="text-gray-600">
							Schedule and manage appointments with ease
						</p>
					</div>
					{/* Add more feature cards */}
				</section>
			</main>

			<Footer />
		</div>
	);
}