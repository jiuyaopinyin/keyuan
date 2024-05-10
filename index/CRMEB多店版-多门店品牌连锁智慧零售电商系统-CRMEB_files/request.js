function request(url, method, body, headers, authLogin) {
    let baseUrl = window.BASE_USER || location.origin;
    let baseHeader = {'Content-Type': 'application/json;charset=UTF-8'};
    if (method.toLowerCase() === 'get') {
        let queryUrl = '';

        if (body !== undefined) {
            Object.keys(body).map(function (key) {
                queryUrl += key + '=' + body[key] + '&';
            });
            body = undefined;
        }

        if (queryUrl) {
            url = url + (url.indexOf('?') === -1 ? '?' : '&') + queryUrl;
        }
    }

    baseUrl = baseUrl + url;

    if (headers) {
        baseHeader = Object.assign(baseHeader, headers);
    }

    let token = localStorage.getItem('token')
    if (token) {
        baseHeader.authorization = token;
        baseHeader['authori-zation'] = token;
    }
    if (!token && authLogin) {
        function_exists('commonLogin') && commonLogin(true)
        return Promise.reject({msg: '请登录'});
    }


    return new Promise(async function (resolve, reject) {
        let response = await fetch(baseUrl, {
            method: method.toLowerCase(),
            headers: baseHeader,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            mode: "cors"
        });

        let data = await response.json();

        if (response.status >= 200) {
            switch (data.status) {
                case 200:
                case 500:
                case 501:
                case 502:
                    resolve(data);
                    break;
                case 410000:
                case 410001:
                case 410002:

                    if (authLogin) {
                        localStorage.removeItem('token')

                        if (function_exists('commonLogin')) {
                            commonLogin(true);
                        }
                    }

                    reject({msg: '请登录！', status: data.status});
                    break;
                case 400:
                    reject(data);
                    break;
                default:
                    reject({msg: '未知错误'});
                    break;
            }
        } else {
            reject(data);
        }
    });
}

function postRequest(url, data, auth) {
    return request(url, 'post', data, {}, auth === undefined ? true : auth);
}

function getRequest(url, data, auth) {
    return request(url, 'get', data, {}, auth === undefined ? true : auth);
}

// JS判断函数是否存在 （函数不会被运行）
function function_exists(fname = '') {
    let res = false;

    try {
        if (typeof (eval(fname)) == "function") {
            // 存在
            res = true;
        } else {
            // 不存在
            res = false;
        }
    } catch (e) {
        // 不存在
        res = false;
    }

    return res;
}
