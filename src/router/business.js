const children = [{
    path: "index",
    name: "business.index",
    component: () => import("@/components/business/Index.vue"),
    meta: {
        menu: true, title: "我的", auth: true, cache: true
    }
},
    {
        path: "profile",
        name: "business.profile",
        component: () => import("@/components/business/Profile.vue"),
        meta: {
            menu: false, title: "个人资料", auth: true
        }
    },
    {
        path: "order",
        name: "business.order",
        component: () => import("@/components/business/OrderList.vue"),
        meta: {
            menu: false, title: "我的订单", auth: true
        }
    },
    {
        path: "consume",
        name: "business.consume",
        component: () => import("@/components/business/Consume.vue"),
        meta: {
            menu: false, title: "消费记录", auth: true
        }
    },
    {
        path: "charge",
        name: "business.charge",
        component: () => import("@/components/business/Charge.vue"),
        meta: {
            menu: false, title: "充值记录", auth: true
        }
    },
    {
        path: "auth",
        name: "business.auth",
        component: () => import("@/components/business/EmailAuth.vue"),
        meta: {
            menu: false, title: "邮箱认证", auth: true
        }
    },
    {
        path: "address",
        name: "business.address",
        component: () => import("@/components/business/Address.vue"),
        meta: {
            menu: false, title: "收货地址", auth: true
        }
    },
    {
        path: "address/edit/:id",
        name: "business.address.edit",
        props:true,
        component: () => import("@/components/business/AddressEdit.vue"),
        meta: {
            menu: false, title: "收货地址编辑", auth: true
        }
    },
    {
        path: "login",
        name: "business.login",
        component: () => import("@/components/business/Login.vue"),
        meta: {
            title: "登录", cache: true
        }
    },
    {
        path: "register",
        name: "business.register",
        component: () => import("@/components/business/Register.vue"),
        meta: {
            title: "注册", cache: true
        }
    }
    ]
export default {
    path: "/business", name: "business",redirect:"/business/index", children: children
}

