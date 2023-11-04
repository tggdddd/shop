import {POST, UPLOAD} from "@/plus/axios.js";

export const categoryApi = async () => {
    return POST("/shop/category")
}
export const categoryDetailApi = async (data) => {
    return POST("/shop/category", data)
}
export const categoryListApi = async () => {
    return POST("/shop/category_list",)
}
export const indexApi = async (page = 1, limit = 10) => {
    return POST("/shop/index", {page, limit});
}
export const productDetailApi = async function (id) {
    return POST("/shop/shop_detail", {id})
}
export const productStarApi = async function (id, star) {
    return POST("/shop/shop_star", {id, star})
}
export const productAddCartApi = async function (id) {
    return POST("/shop/cart_add", {id})
}
export const productCartApi = async function () {
    return POST("/shop/cart",)
}
export const deleteCartApi = async function (id) {
    return POST("/shop/cart_delete", {id})
}
export const updateCartApi = async function (data) {
    return POST("/shop/cart_update", {data})
}
export const submitOrderApi = async function (data) {
    return POST("/order/submit_order", {data})
}

export const getOrderDetail = async function (id) {
    return POST("/order/order_detail", {id})
}
export const changeOrderAddressApi = async function (addressId, orderId) {
    return POST("/order/order_address_change", {addressId, orderId})
}
export const cancelOrderApi = async function (id) {
    return POST("/order/cancel_order", {id})
}
export const payOrderApi = async function (id) {
    return POST("/order/pay_order", {id})
}
export const refundOrderApi = async function (id) {
    return POST("/order/refund_order", {id})
}
export const getExpressDetailApi = async function (id) {
    return POST("/order/query_express", {id})
}

export const returnSubmitApi = async function (data,formData) {
    return UPLOAD("/order/return_submit", data,formData)
}

export const getReturnDetailApi = async function(code){
    return POST("/order/return_order",{code});
}

export const submitReturnExpressApi = async function(id,code){
    return POST("/order/return_express",{id,code});
}
export const confirmReceivedApi = async function(id){
    return POST("/order/confirm_receive",{id});
}
export const commentOrderApi = async function(id){
    return POST("/order/comment_order",{id});
}
export const consumeRecordApi = async function(page,size){
    return POST("/order/consume_record",{page,size});
}