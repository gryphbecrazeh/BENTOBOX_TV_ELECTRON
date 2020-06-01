class VideoScraper {
	constructor() {
		this.getVideo = async (url) => {
			let videoUrl;
			const puppeteer = window.require("puppeteer");
			const chromium = require("chromium");

			return puppeteer
				.launch({
					headless: true,
					executablePath: chromium.path,
					args: ["--no-sandbox", "--disable-setuid-sandbox"],
				})
				.then(async (browser) => {
					// console.log("puppeteerlaunched");
					const page = await browser.newPage();
					page.on("response", (response) => {
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
