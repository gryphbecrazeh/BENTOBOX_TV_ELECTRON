class VideoScraper {
	constructor() {
		this.getVideo = async (url) => {
			let videoUrl;
			const puppeteer = window.require("puppeteer");
			// Bring in a new instance of chromium to run outside of the electron one
			const chromium = window.require("chromium");

			let chromiumPath = chromium.path.replace(/app.asar/, "app.asar.unpacked");
			return puppeteer
				.launch({
					headless: true,
					executablePath: chromiumPath,
				})
				.then(async (browser) => {
					const page = await browser.newPage();
					page.on("response", (response) => {
						// Several video files appear when being scraped, only grab the first one
						if (videoUrl == null) {
							let resUrl = response["_url"];
							let status = response["_status"];
							if (resUrl.match(/s.\.mp4\.sh\/\w+\//gim) && status == "206") {
								videoUrl = resUrl;
							}
						}
					});
					await page.goto(url);
					await browser.close();
					return await videoUrl;
				})
				.catch((err) => console.log(err));
		};
	}
}

export default VideoScraper;
