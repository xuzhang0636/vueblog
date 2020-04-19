import Vue from 'vue'
import Router from 'vue-router'
import UserList from "../components/UserList";
import ArticlePost from "../components/ArticlePost";


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/users',
            name: '',
            component: UserList,
            hidden: true
        },
        {
            path: '/article',
            name: '',
            component: ArticlePost,
            hidden: true
        }
    ]
})
