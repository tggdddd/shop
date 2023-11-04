const children = [
    {
        path: "detail/:id",
        props:true,
        name: "product.detail",
        component: () => import("@/components/product/Detail.vue"),
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