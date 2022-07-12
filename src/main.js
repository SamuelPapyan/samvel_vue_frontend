import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import StudentList from "@/components/StudentList";
import "bootstrap";
import CreateStudent from "@/components/CreateStudent";
import EditStudent from "@/components/EditStudent";
import ConnectionError from "@/components/ConnectionError";
import SearchResult from "@/components/SearchResult";

const routes = [
    {path:'/', component:StudentList},
    {path:'/create',component: CreateStudent},
    {path:'/edit/:id', component: EditStudent},
    {path:'/error', component: ConnectionError},
    {path:'/search',component: SearchResult}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')