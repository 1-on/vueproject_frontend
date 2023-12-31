import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Manager',
            component: () => import('@/views/Manager.vue'),
            meta: {requiresAuth: true},
            redirect: '/home',
            children: [
                {path: 'home', name: 'Home', component: () => import('@/views/manager/Home.vue')},
                {path: 'course', name: 'Course', component: () => import('@/views/manager/Course.vue')},
                {path: 'student', name: 'Student', component: () => import('@/views/manager/Student.vue')},
                {path: 'person_s', name: 'Person_s', component: () => import('@/views/manager/Person_S.vue')},
                {path: 'person_t', name: 'Person_t', component: () => import('@/views/manager/Person_T.vue')},
                {path: 'courseList', name: 'CourseList', component: () => import('@/views/manager/CourseList.vue')},
                {path: 'grade', name: 'Grade', component: () => import('@/views/manager/Grade.vue')},
                {path: 'teacher', name: 'Teacher', component: () => import('@/views/manager/Teacher.vue')},
                {
                    path: 'studentCourse',
                    name: 'StudentCourse',
                    component: () => import('@/views/manager/StudentCourse.vue')
                },
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
            component: () => import('@/views/Register.vue'),
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('user')
    if (to.matched.some(route => route.meta.requiresAuth) && !isAuthenticated) {
        next('/login')
    } else {
        next();
    }
})

export default router
