import {showSuccessToast, showFailToast, showConfirmDialog} from 'vant';
function cdnurl(url){
    if (url.startsWith("http")){
        return cdnurl;
    }
    return import.meta.env.VITE_STATIC_URL+url;
}
function formatTime(timestamp,formatter="y-M-d h:m:s"){
    if (timestamp == null){
        return "";
    }
    timestamp = timestamp.toString().padEnd(13,"0");
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return formatter.replace("y",year)
        .replace("M",month)
        .replace("d",day)
        .replace("h",hour)
        .replace("m",minute)
        .replace("s",second)
}
export default {
    install(app)
    {
        app.config.globalProperties.$success = showSuccessToast;
        app.config.globalProperties.$fail = showFailToast;
        app.config.globalProperties.$confirm = showConfirmDialog;
        app.config.globalProperties.$cdnurl = cdnurl;
        app.config.globalProperties.$formatTime = formatTime;
    }
}