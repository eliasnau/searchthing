import Link from "next/link";
import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";

export default function TermsPage() {
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
						<h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
						<p className="text-sm text-muted-foreground">
							Last updated: January 4, 2026
						</p>
					</div>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
						<p className="text-muted-foreground leading-relaxed">
							By accessing and using SearchThing, you accept and agree to be
							bound by these Terms of Service. If you do not agree to these
							terms, please do not use the service.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Service Description</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing is a free, open-source search aggregation tool that
							provides quick access to multiple search engines and websites
							through "bang" commands. The service operates entirely in your
							browser and redirects your searches to third-party services.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Use of Service</h2>
						<p className="text-muted-foreground leading-relaxed">
							You agree to use SearchThing for lawful purposes only. You must
							not:
						</p>
						<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
							<li>Use the service in any way that violates applicable laws</li>
							<li>
								Attempt to interfere with the proper functioning of the service
							</li>
							<li>
								Use automated systems to access the service in a way that sends
								more requests than a human could reasonably produce
							</li>
							<li>Attempt to reverse engineer or modify the service</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Third-Party Services</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing redirects searches to third-party websites and search
							engines (Google, DuckDuckGo, Wikipedia, Amazon, etc.). Your use of
							these services is subject to their respective terms of service and
							privacy policies. SearchThing is not responsible for the content,
							accuracy, or availability of third-party services.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Disclaimer of Warranties</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing is provided "as is" and "as available" without any
							warranties of any kind, either express or implied. We do not
							warrant that:
						</p>
						<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
							<li>The service will be uninterrupted or error-free</li>
							<li>The service will meet your specific requirements</li>
							<li>Any errors in the service will be corrected</li>
							<li>
								The results obtained from using the service will be accurate or
								reliable
							</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Limitation of Liability</h2>
						<p className="text-muted-foreground leading-relaxed">
							To the fullest extent permitted by law, SearchThing and its
							contributors shall not be liable for any indirect, incidental,
							special, consequential, or punitive damages, or any loss of
							profits or revenues, whether incurred directly or indirectly, or
							any loss of data, use, goodwill, or other intangible losses
							resulting from:
						</p>
						<ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
							<li>Your use or inability to use the service</li>
							<li>Any unauthorized access to or use of our servers</li>
							<li>Any bugs, viruses, or other harmful code</li>
							<li>
								Any content obtained from the service or third-party services
							</li>
						</ul>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Intellectual Property</h2>
						<p className="text-muted-foreground leading-relaxed">
							SearchThing is open-source software. The source code is available
							on{" "}
							<Link
								href="https://github.com/eliasnau/searchthing"
								target="_blank"
								className="text-purple-500 hover:text-purple-600"
							>
								GitHub
							</Link>{" "}
							and subject to the license terms specified in the repository. All
							trademarks, logos, and brand names of third-party services
							mentioned are the property of their respective owners.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">User Content</h2>
						<p className="text-muted-foreground leading-relaxed">
							Any settings, configurations, or customizations you create
							(including bang overrides) remain your property. SearchThing does
							not claim any ownership over your user-generated content. All user
							data is stored locally on your device.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Modifications to Service</h2>
						<p className="text-muted-foreground leading-relaxed">
							We reserve the right to modify, suspend, or discontinue the
							service at any time without notice. We will not be liable to you
							or any third party for any modification, suspension, or
							discontinuance of the service.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Changes to Terms</h2>
						<p className="text-muted-foreground leading-relaxed">
							We reserve the right to update or modify these Terms of Service at
							any time. Changes will be effective immediately upon posting to
							this page. Your continued use of SearchThing after any changes
							constitutes acceptance of the new terms.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Governing Law</h2>
						<p className="text-muted-foreground leading-relaxed">
							These Terms of Service shall be governed by and construed in
							accordance with applicable laws, without regard to conflict of law
							principles.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-2xl font-semibold">Contact</h2>
						<p className="text-muted-foreground leading-relaxed">
							If you have any questions about these Terms of Service, please
							contact us at{" "}
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
