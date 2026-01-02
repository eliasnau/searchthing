import "./App.css";

function App() {
	const handleOpenSettings = () => {
		window.open("https://searchthing.xyz/settings", "_blank");
	};

	const handleOpenBangs = () => {
		window.open("https://searchthing.xyz/bangs", "_blank");
	};

	const handleRateExtension = () => {
		window.open("https://chromewebstore.google.com/detail/searchthing/oilahejhenoeljbicconidaicggjemej", "_blank");
	};

	return (
		<div className="container">
			<header className="header">
				<button
					type="button"
					className="settings-icon"
					onClick={handleOpenSettings}
					aria-label="Settings"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<title>Settings</title>
						<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
						<circle cx="12" cy="12" r="3" />
					</svg>
				</button>
			</header>

			<main className="main">
				<div className="content">
					<h1 className="title">SearchThing</h1>
					<div className="links">
						<button
							type="button"
							className="bangs-button"
							onClick={handleOpenBangs}
						>
							View all bang commands
						</button>
						<button
							type="button"
							className="rate-button"
							onClick={handleRateExtension}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="currentColor"
								stroke="none"
							>
								<title>Star</title>
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
							</svg>
							Rate extension
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
