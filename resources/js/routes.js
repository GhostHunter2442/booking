import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables";
import Bookable from "./bookable/Bookable";
import Review from "./review/Review";
import Basket from "./basket/Basket";
import Contack from "./contact/Contact";
import About from "./about/About";
const routes =[
    {
        path:"/",
        component:Bookables,
        name:"home",

    },
    {
        path:"/bookable/:id",
        component:Bookable,
        name:"bookable",

    },
    {
        path:"/reviews/:id",
        component:Review,
        name:"review",

    },
    {
        path:"/basket",
        component:Basket,
        name:"basket",

    },
    {
        path:"/contact",
        component:Contack,
        name:"contact",

    },
    {
        path:"/about",
        component:About,
        name:"about",

    },
    {
        path:"/auth/login",
        component:require("./auth/Login").default,
        name:"login",

    },
    {
        path:"/auth/register",
        component:require("./auth/Register").default,
        name:"register",

    },

];

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { x: 0, y: 500 }
        }
      }
});

export default router;
