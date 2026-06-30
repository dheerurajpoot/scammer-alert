import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";



const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "Scammers.Pro - Crowdsourced Fraud Protection",
		template: "%s | Scammers.Pro",
	},
	description:
		"The global database for reporting and searching digital scammers. Protect your community by identifying fraudulent phone numbers, social media IDs, and digital service scams.",
	keywords: [
		"scammer alert",
		"report fraud",
		"scam database",
		"verify phone number",
		"digital safety",
		"online scams",
		"blogging scams",
		"phishing protection",
	],
	authors: [{ name: "Deelzo.com" }],
	creator: "Deelzo.com",
	publisher: "Deelzo.com",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://scammers.pro"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Scammers.Pro - Crowdsourced Fraud Protection",
		description:
			"Stop scammers before they strike. Search our community-verified database of fraudulent actors.",
		url: "https://scammers.pro",
		siteName: "Scammers.Pro",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: "Scammer Alert - Stop Digital Fraud",
		description:
			"Join the community-driven fight against online scammers. Report and search for fraudsters today.",
		creator: "@ScammerAlertHQ",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [
			{ url: "/favicon-96x96.png" },
			{ url: "/web-app-manifest-192x192.png" },
			{ url: "/apple-touch-icon.png" },
		],
	},
	category: "Security",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='bg-background' suppressHydrationWarning>
			{/* Google AdSense Script */}
			<Script
				async
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8094520346016014'
				crossOrigin='anonymous'
				strategy='afterInteractive'
			/>
			<body
				className={`${outfit.className} antialiased bg-background text-foreground`}
				suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
}
