import Detail from "@/components/product/Detail.vue";

const children = [
    {
        path: "detail/:id",
        props:true,
        name: "product.detail",
        component: Detail,
        meta: {
            // menu: false,
            // title: "商品",
            // auth: false,
            // cache: false
        }
    },
]
export default {
    path: "/product", name: "product", children: children
}