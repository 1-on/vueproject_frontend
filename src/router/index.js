import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Manager',
            component: () => import('@/views/Manager.vue'),
            redirect: '/home',
            children: [
                {path: 'home', name: 'Home', component: () => import('@/views/manager/Home.vue')},
                {path: 'course', name: 'Course', component: () => import('@/views/manager/Course.vue')},
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login.vue'),
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/Regitser.vue'),
        }
    ]
})

export default router
