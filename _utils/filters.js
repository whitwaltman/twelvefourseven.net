const filters = {
    fmtdDate: (dateObj) => {
        return dateObj.toDateString();
    },
    fmtdTime: (dateObj) => {
        return dateObj.toLocaleTimeString("en-US", { timeZone: "UTC" });
    }
}

export default filters;