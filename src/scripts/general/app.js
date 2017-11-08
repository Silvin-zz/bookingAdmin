
Vue.component('modal', {
    template: '#bs-modal',
    data: function () {
        console.log("### DATA");
    },
});




const Clients       =   { 
                            template: '#client-list',
                            data: function(){
                                console.log("clients");                                
                                return{
                                    
                                    clients:[
                                        {name: "", username: "", email: ""},
                                        
                                    ]
                                }

                            },
                            methods:{



                                loadUsers: function() {



                                    var vm = this
                                    axios.get("https://jsonplaceholder.typicode.com/users")
                                      .then(response => {
                                          // JSON responses are automatically parsed.
                                          vm.clients = response.data
                                        })
                                        .catch(e => {
                                          console.log(e)
                                        })

                                    

                                },

                                changeMessagess:function(message){

                                    return message.split('').reverse().join('')
                                }
                            },
                            watch:{

                                clients:function(){

                                    console.log("saludos")
                                }
                            },
                            created: function(){

                                this.loadUsers()
                            },
                            
                            computed:{

                                changeMessage:function(){

                                    return "Hola".split('').reverse().join('')
                                }
                            }     


                        }
const Configuration = { template: '#config-commision'   }
const  Events       = { template: '#client-events'      }         

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [

    { path: '/client', component: Clients           },
    { path: '/event' , component: Events            },
    { path: '/config', component: Configuration     }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app')

