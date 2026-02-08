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
	}
};

export default filters;