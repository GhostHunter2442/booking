import VueRouter from 'vue-router';
import Example2 from "./components/ExampleComponent.vue";
import Bookables from "./bookables/Bookables";

const routes =[
    {
        path:"/",
        component:Bookables,
        name:"home",

    },
    {
        path:"/second",
        component:Example2,
        name:"second",

    }
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;
