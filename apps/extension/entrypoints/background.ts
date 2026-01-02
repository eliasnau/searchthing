export default defineBackground(() => {
	browser.runtime.onMessageExternal.addListener(
		(request, sender, sendResponse) => {
			if (request.action === "checkInstalled") {
				sendResponse({ installed: true });
			}
			return true;
		},
	);
});
