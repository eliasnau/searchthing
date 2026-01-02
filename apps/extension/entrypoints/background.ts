export default defineBackground(() => {
	console.log("Hello background!", { id: browser.runtime.id });

	browser.runtime.onMessageExternal.addListener(
		(request, sender, sendResponse) => {
			if (request.action === "checkInstalled") {
				sendResponse({ installed: true });
			}
			return true;
		},
	);
});
