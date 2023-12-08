import {createRouter, createWebHashHistory} from "vue-router"
import {useCookies} from "vue3-cookies";

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
            component: import("@/components/Home.vue"),
            meta: {
                menu: true,
                title: "首页",
                cache: true
            }
        },
        {
            path: "/category",
            name: "category",
            component: import("@/components/product/Category.vue"),
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
            component: import("@/components/product/CategoryDetail.vue"),
            meta: {

            }
        },
        {
            path: "/cart",
            name: "cart",
            component: import("@/components/product/Cart.vue"),
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