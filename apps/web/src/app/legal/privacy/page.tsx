import Link from "next/link";
import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";

export default function PrivacyPage() {
	return (
		<div className="flex flex-col min-h-screen bg-background">
			<header className="flex-none p-4 w-full">
				<div className="flex justify-between items-center mx-auto w-full max-w-5xl">
					<Link
						href="/"
						className="flex gap-2 items-center p-2 transition-colors text-muted-foreground hover:text-foreground"
					>
						<ArrowLeft size={18} />
						<span>Back</span>
					</Link>
				</div>
			</header>

			<main className="container relative flex-1 px-4 py-12 mx-auto max-w-3xl">
				<div className="space-y-8">
					<div>
						<h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
						<p className="text-sm text-muted-foreground">
							Last updated: January 4, 2026
						</p>
					</div>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Overview</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing is committed to protecting your privacy. This privacy
							policy explains how we handle your information when you use our
							service.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Data Collection</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing operates entirely in your browser. We do not collect,
							store, or transmit any personal data to our servers. All data
							remains on your device.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Local Storage</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing uses your browser's localStorage to save your
							preferences locally on your device. This includes your custom bang
							command configurations, default search engine, and theme
							preferences. This data never leaves your device and can be cleared
							at any time through your browser settings.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Third-Party Services</h2>
						<p className="text-muted-foreground leading-relaxed">
							When you perform a search, SearchThing redirects you to
							third-party search engines (such as Google, DuckDuckGo, Wikipedia,
							etc.). These services have their own privacy policies and may
							collect data about your searches. SearchThing does not track, log,
							or have access to these searches.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Cookies</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing does not use cookies. We rely on localStorage for
							storing preferences locally in your browser.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Analytics</h2>
						<p className="text-muted-foreground leading-relaxed">
							We do not use any analytics, tracking, or monitoring tools.
							SearchThing does not collect usage statistics or track user
							behavior.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Data Export and Import</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing allows you to export and import your settings as a
							JSON file. This export contains your bang overrides and default
							engine preference. This file remains on your device unless you
							choose to share it.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Browser Extension</h2>
						<p className="text-muted-foreground leading-relaxed">
							If you use the SearchThing browser extension, it operates with the
							same privacy principles. All data remains local to your browser,
							and no information is transmitted to external servers.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Changes to This Policy</h2>
						<p className="text-muted-foreground leading-relaxed">
							We may update this privacy policy from time to time. Any changes
							will be posted on this page with an updated revision date.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Contact</h2>
						<p className="text-muted-foreground leading-relaxed">
							If you have questions about this privacy policy, please contact us
							at{" "}
							<a
								href="mailto:contact@codity.net"
								className="text-purple-500 hover:text-purple-600"
							>
								contact@codity.net
							</a>
							.
						</p>
					</section>
				</div>
			</main>
		</div>
	);
}
