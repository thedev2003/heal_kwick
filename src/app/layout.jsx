import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"; // Import the cn utility

// Correctly configure the font as a CSS variable
const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata = {
	title: "Heal Kwick",
	description: "Your modern health management system.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			{/* Apply the font variable to the body tag using the cn utility */}
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				{children}
			</body>
		</html>
	);
}