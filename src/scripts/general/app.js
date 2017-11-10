
//Single routing on vuejs
         
const routes = [

    { path: '/client', component: Clients           },
    { path: '/event' , component: Events            },
    { path: '/config', component: Configuration     }
]


const router = new VueRouter({
  routes // short for `routes: routes`
})


const app = new Vue({
  router
}).$mount('#app')

