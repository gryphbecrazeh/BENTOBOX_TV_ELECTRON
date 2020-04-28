import Store from "../data/store";
const getUpdates = () => {
	const axios = require("axios");
	const config = {
		headers: { "Access-Control-Allow-Origin": "*" },
	};
	axios
		.get("https://frozen-earth-42502.herokuapp.com/api/catalog", {
			crossdomain: true,
		})
		.then((res) => {
			let episodes = res.data.videos;
			episodes.forEach((episode) => (episode.video = null));
			const store = new Store({
				configName: "user-catalog",
				defaults: {
					episodes: [],
				},
			});
			store.set("episodes", res.data.videos);
		})
		.catch((err) => console.log(err));
};

export default getUpdates;
