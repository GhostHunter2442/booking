import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables";
import Bookable from "./bookable/Bookable";
import Review from "./review/Review";
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
