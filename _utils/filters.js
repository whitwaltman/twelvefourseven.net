const filters = {
	fmtDate: (dateObj) => {
		return dateObj.toDateString();
	},
	fmtTime: (dateObj) => {
		return dateObj.toLocaleTimeString("en-US", { timeZone: "UTC" });
	}
};

export default filters;