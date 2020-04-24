const Store = require("../data/store");
const getUpdates = () => {
	const axios = require("axios");
	axios
		.get("https://frozen-earth-42502.herokuapp.com/api/catalog")
		.then((res) => {
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

module.exports = getUpdates;
