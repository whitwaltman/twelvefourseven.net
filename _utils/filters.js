const filters = {
	fmtDate: (dateObj) => {
		return dateObj.toDateString();
	},
	fmtTime: (dateObj) => {
		return dateObj.toLocaleTimeString("en-US", { timeZone: "UTC" });
	},
	unslug: (slug) => {
		return slug.split("-").join(" ");
	},
	capitalize: (str) => {
		return str[0].toUpperCase() + str.slice(1);
	},
	trim: (str) => {
		if (str.length <= 36) return str;
		const words = str.split(" ");
		let result = "";
		let idx = 0;
		while (result.length < 36) {
			result += words[idx] + " ";
			idx += 1;
		}
		return result.slice(0, -1) + "...";
	}
};

export default filters;