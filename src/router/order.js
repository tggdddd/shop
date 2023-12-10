import OrderConfirm from "@/components/order/OrderConfirm.vue";
import ExpressDetail from "@/components/order/ExpressDetail.vue";
import Return from "@/components/order/Return.vue";

const children = [
    {
        path: "confirm/:id",
        props:true,
        name: "order.confirm",
        component: OrderConfirm,
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
        component: ExpressDetail,
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
        component: Return,
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