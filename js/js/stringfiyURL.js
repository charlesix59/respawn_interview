function stringify(data) {
    // 将对象转化为数组
    const pairs = Object.entries(data);
    return pairs
        .map(([k, v]) => {
            // 判断v是否为空
            let noValue = false;
            if (v === null || v === undefined || typeof v === "object") {
                noValue = true;
            }
            return `${encodeURIComponent(k)}=${noValue ? "" : encodeURIComponent(v)}`;
        })
        .join("&");
}

console.log(stringify({ a: 3, 山: "月" }));