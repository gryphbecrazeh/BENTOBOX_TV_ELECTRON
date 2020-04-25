const electron = window.require("electron");
const path = window.require("path");
const fs = window.require("fs");

class Store {
	constructor(opts) {
		console.log(opts);
		const userDataPath = (electron.app || electron.remote.app).getPath(
			"userData"
		);

		this.path = path.join(userDataPath, opts.configName + ".json");

		this.data = parseDataFile(this.path, opts.defaults);
	}
	//
	// This will just return the property on the 'data' object
	//
	get(key) {
		return this.data[key];
	}

	set(key, val) {
		this.data[key] = val;
		fs.writeFileSync(this.path, JSON.stringify(this.data));
	}
}

function parseDataFile(filePath, defaults) {
	try {
		return JSON.parse(fs.readFileSync(filePath));
	} catch (error) {
		return defaults;
	}
}

// module.exports = Store;
export default Store;
