import {createRouter, createWebHashHistory} from "vue-router"
import {useCookies} from "vue3-cookies";

import Home from "@/components/Home.vue";
import Category from "@/components/product/Category.vue";
import CategoryDetail from "@/components/product/CategoryDetail.vue";
import Cart from "@/components/product/Cart.vue";

const routes = []
const {cookies} = useCookies();
const imports = import.meta.glob(["./**.js", "!./index.js"], {eager: true})
for (const module of Object.values(imports)) {
    if (module?.default) {
        routes.push(module.default)
    }
}
const router = createRouter({
    history: createWebHashHistory(),
    linkExactActiveClass: "active",
    routes: [...routes,
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                menu: true,
                title: "首页",
                cache: true
            }
        },
        {
            path: "/category",
            name: "category",
            component: Category,
            meta: {
                menu: true,
                title: "分类",
                cache: true
            }
        },
        {
            path: "/category/:id",
            name: "category.detail",
            props:true,
            component: CategoryDetail,
            meta: {

            }
        },
        {
            path: "/cart",
            name: "cart",
            component: Cart,
            meta: {
                menu: true,
                title: "购物车",
                cache: true
            }
        }
        ]
})
router.beforeEach(async (to, from, next) => {
    next()
})
router.afterEach((to, from) => {
    document.title = to.meta?.title??import.meta.env.VITE_TITLE
})
export default router