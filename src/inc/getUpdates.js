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
			const store = new Store({
				configName: "user-catalog",
				defaults: {
					episodes: [],
				},
			});

			let newEpisodes = res.data.videos;
			let oldEpisodes = store.get("episodes");
			newEpisodes.forEach((newEpisode) => {
				newEpisode.video = null;
				let index = oldEpisodes.findIndex(
					(oldEpisode) => newEpisode.episode == oldEpisode.episode
				);
				if (index >= 0) {
					oldEpisodes[index] = {
						...newEpisode,
						...oldEpisodes[index],
					};
				} else {
					oldEpisodes.push(newEpisode);
				}
			});
			store.set("episodes", oldEpisodes);
		})
		.catch((err) => console.log(err));
};

export default getUpdates;
