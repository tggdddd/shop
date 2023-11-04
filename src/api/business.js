import {POST, GET, UPLOAD} from '@/plus/axios.js'
import {useCookies} from "vue3-cookies";
import {showSuccessToast} from "vant";
import router from "@/router/index.js";
const {cookies} = useCookies()
export const loginApi = async (data = null) => {
    return new Promise((resolve, reject) => {
        POST("/shop/login", data).then(r => {
            cookies.set('token', r.data)
            showSuccessToast({
                message: r.msg,
                duration: 400,
                onClose: () => {
                    router.push({name: "home"})
                }
            })
            resolve(r)
        }).catch(e => {
            reject(e)
        })
    })
}
export const registerApi = (data = null) => {
    return POST("/shop/register", data)
}

export const loginOutApi = async () => {
    return new Promise((resolve, reject) => {
        POST("/shop/logout").then(r => {
            cookies.set('token',null)
            showSuccessToast({
                message: r.msg,
                duration: 400
            })
            resolve(r)
        }).catch(e => {
            reject(e)
        })
    })
}
export const authApi = async (id, mobile) => {
    return POST("/shop/check_auth", {id, mobile});
}
export const getUserInfoApi = async () => {
    return GET("/shop/profile");
}
export const modifyProfileApi = async (params) => {
    return UPLOAD("/shop/profile", params)
}
export const sendEmailCodeApi = async (code) => {
    return POST("/shop/auth_email", {code})
}
export const validEmailApi = async ({email,code}) => {
    return POST("/shop/auth_email", {code,email})
}

export const addressListApi = async () => {
    return POST("/shop/address", )
}
export const addressDetailApi = async (id) => {
    return POST("/shop/address/action/detail", {id})
}
export const addressDeleteApi = async (id) => {
    return POST("/shop/address/action/delete",{id} )
}
export const addressSaveOrUpdateApi = async (data) => {
    return POST("/shop/address/action/save",data )
}
export const getBusinessOrdersApi = async function (type,page,size){
    return POST("/order/order_list",{type,page,size} )
}