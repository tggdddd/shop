import Index from "@/components/business/Index.vue";
import Profile from "@/components/business/Profile.vue";
import OrderList from "@/components/business/OrderList.vue";
import Consume from "@/components/business/Consume.vue";
import Charge from "@/components/business/Charge.vue";
import EmailAuth from "@/components/business/EmailAuth.vue";
import Address from "@/components/business/Address.vue";
import AddressEdit from "@/components/business/AddressEdit.vue";
import Login from "@/components/business/Login.vue";
import Register from "@/components/business/Register.vue";

const children = [
    {
    path: "index",
    name: "business.index",
        component: Index,
    meta: {
        menu: true, title: "我的", auth: true, cache: true
    }
},
    {
        path: "profile",
        name: "business.profile",
        component: Profile,
        meta: {
            menu: false, title: "个人资料", auth: true
        }
    },
    {
        path: "order",
        name: "business.order",
        component: OrderList,
        meta: {
            menu: false, title: "我的订单", auth: true
        }
    },
    {
        path: "consume",
        name: "business.consume",
        component: Consume,
        meta: {
            menu: false, title: "消费记录", auth: true
        }
    },
    {
        path: "charge",
        name: "business.charge",
        component: Charge,
        meta: {
            menu: false, title: "充值记录", auth: true
        }
    },
    {
        path: "auth",
        name: "business.auth",
        component: EmailAuth,
        meta: {
            menu: false, title: "邮箱认证", auth: true
        }
    },
    {
        path: "address",
        name: "business.address",
        component: Address,
        meta: {
            menu: false, title: "收货地址", auth: true
        }
    },
    {
        path: "address/edit/:id",
        name: "business.address.edit",
        props:true,
        component: AddressEdit,
        meta: {
            menu: false, title: "收货地址编辑", auth: true
        }
    },
    {
        path: "login",
        name: "business.login",
        component: Login,
        meta: {
            title: "登录", cache: true
        }
    },
    {
        path: "register",
        name: "business.register",
        component: Register,
        meta: {
            title: "注册", cache: true
        }
    }
    ]
export default {
    path: "/business", name: "business",redirect:"/business/index", children: children
}

