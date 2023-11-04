import axios from "axios"
import {showFailToast} from "vant";
import router from "@/router/index.js";
import {useCookies} from "vue3-cookies";
const {cookies} = useCookies()
const server = axios.create({
    baseURL: import.meta.env.MODE === "development"?"/api":import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
})
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
server.interceptors.request.use(function (config) {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    config.params = {
        "token": cookies.get("token"),
        ...config.params
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use(function (response) {
    if (response.data.code){
        return response.data;
    }
    showFailToast(response.data.msg)
    return Promise.reject(response.data);
}, function (err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求'
                break;
            case 401:
                err.message = '请登录'
                showFailToast(err.message)
                router.push({name:"business.login"})
                return
            case 403:
                err.message = '拒绝访问'
                break;
            case 404:
                err.message = '请求错误,未找到该资源'
                break;
            case 405:
                err.message = '请求方法未允许'
                break;
            case 408:
                err.message = '请求超时'
                break;
            case 500:
                err.message = '服务器端出错'
                break;
            case 501:
                err.message = '网络未实现'
                break;
            case 502:
                err.message = '网络错误'
                break;
            case 503:
                err.message = '服务不可用'
                break;
            case 504:
                err.message = '网络超时'
                break;
            case 505:
                err.message = 'http版本不支持该请求'
                break;
            default:
                err.message = `连接错误${err.response.status}`
        }
    } else {
        if (err.code === "ERR_CANCELED"){
            return Promise.reject(err.message);
        }
        err.message = "连接到服务器失败"
    }
    showFailToast(err.message)
    return Promise.reject(err.message);
});

const GET = (url,params) => {
    return new Promise((resolve, reject) => {
        server({
            method: 'get',
            url,
            params,
            cancelToken: new CancelToken(c => {
                cancel = c
            })
        }).then(res => {
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}

const POST = (url, data) => {
    return new Promise((resolve, reject) => {
        server({
            method: 'post',
            url,
            data,
            cancelToken: new CancelToken(c => {
                cancel = c
            })
        }).then(res => {
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}

const UPLOAD = (url,params,RequestData) => {
    if (RequestData == null){
        RequestData = new FormData();
    }
    if (params&&JSON.stringify(params) !== "{}") {
        for (const key in params) {
            RequestData.append(key, params[key])
        }
    }
    return new Promise((resolve, reject) => {
        server({
            method: 'post',
            url: url,
            data: RequestData,
            headers: {'Content-Type': 'multipart/form-data'},
            cancelToken: new CancelToken(c => {
                cancel = c
            })
        })
            .then(res => {
                resolve(res)
            }).catch(err=>{
            reject(err)
        })
    })
}

export {
    GET,
    POST,
    UPLOAD,
    server
}