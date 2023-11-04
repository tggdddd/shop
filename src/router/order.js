const children = [
    {
        path: "confirm/:id",
        props:true,
        name: "order.confirm",
        component: () => import("@/components/order/OrderConfirm.vue"),
        meta: {
            // menu: false,
            title: "确认订单",
            // auth: false,
            // cache: false
        }
    },
    {
        path: "express/:id",
        props:true,
        name: "order.express",
        component: () => import("@/components/order/ExpressDetail.vue"),
        meta: {
            // menu: false,
            title: "物流信息",
            // auth: false,
            // cache: false
        }
    },
    {
        path: "return/:id",
        props:true,
        name: "order.return",
        component: () => import("@/components/order/Return.vue"),
        meta: {
            // menu: false,
            title: "退货退款",
            // auth: false,
            // cache: false
        }
    },
]
export default {
    path: "/order", name: "order", children: children
}