(async () => {
	try {
		const clearBtn = document.querySelector("#btnClear");
		const originName = document.querySelector("#originName");

		const tabs = await chrome.tabs.query({
			currentWindow: true,
			active: true,
		});
		const domain = new URL(tabs[0].url);
		const domainName = domain.hostname;
		originName.innerHTML += `${domainName}`;

		clearBtn?.addEventListener("click", async () => {
			return chrome.runtime.sendMessage(
				{
					msg: "clearCache",
					data: {
						appcache: true,
						cache: true,
						cacheStorage: true,
						cookies: true,
						indexedDB: true,
						localStorage: true,
					},
					origins: [domain.origin],
				},
				function () {
					chrome.tabs.reload(tabs[0].id);
				}
			);
		});
	} catch (err) {
		console.error("Error occured", err);
	}
})();
