// const now = new Date();
const then = new Date(2025, 7, 4, 17, 27);
// const diff = then - now;

const c = {
    "ms_to_sec": 1000,
    "sec_to_min": 60,
    "min_to_hr": 60,
    "hr_to_day": 24
};

module.exports = {
    countdown: getCountdown
    // now_day: now.toDateString(),
    // now_time: now.toLocaleTimeString("en-US", {
    //     hour12: true,
    //     hour: '2-digit',
    //     minute: '2-digit'
    // }),
    // days: Math.floor(days),
    // hours: Math.floor(hours),
    // minutes: Math.ceil(minutes)
}

function getCountdown(now) {
    const diff = then - now;
    const result = [];
    const d = diff / (c["ms_to_sec"] * c["sec_to_min"] * c["min_to_hr"] * c["hr_to_day"]);
    result.push(Math.floor(d));
    const h = (days - Math.floor(days)) * c["hr_to_day"];
    result.push(Math.floor(h));
    const m = (hours - Math.floor(hours)) * c["min_to_hr"];
    result.push(Math.ceil(m));
    return result;
}