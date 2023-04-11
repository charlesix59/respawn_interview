const server = "www.example.com:8080/";

/**
 *
 * @param url 请求网址（除去服务器）
 * @param method 请求方式
 * @param data 要发送数据（Post可用）
 * @return {Promise<unknown>} 返回一个promise对象
 */
function getJson(url,method="GET",data){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        // 创建请求
        xhr.open(method, server + url, true);

        // 设置状态监听函数
        xhr.onreadystatechange(e => {
            if (e.readyState !== 4) {
                return;
            }
            if (this.state === 200) {
                resolve(e.response);
            } else {
                reject(e.statusText);
            }
        })

        // 设置错误监听函数
        xhr.onerror(e => {
            reject(e.statusText);
        })

        // 设置请求信息
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "Application/json");

        // 发送请求
        data = method.toUpperCase() === "GET" ? null : data;
        xhr.send(data || null);
    });
}