
const Clients       =   { 


    template: '#client-list',
    data: function(){
        
        return{
            
            clients:[
                {  Id: "", Name: "", Username: "", Comission: ""},
            ],

            comissions:[
                {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false},
            ],

            newClient : {Id: "", Name: "", Username: "", Comission: "", Password: ""}
        }

    },
    methods:{



        clearClient: function(){

            this.newClient = {Id: "", Name: "", Username: "", Comission: "", Password: ""}
        },

        loadUsers: function() {

            var vm = this

            axios.get(urlBase +  "/comission")
              .then(response => {
                  // JSON responses are automatically parsed.
                  vm.comissions = response.data
                    axios.get(urlBase +  "/client")
                      .then(response => {
                          // JSON responses are automatically parsed.
                          vm.clients = response.data
                        })
                        .catch(e => {
                          console.log(e)
                        })
                })
                .catch(e => {
                  console.log(e)
                })
        },


        saveClient: function(){
            console.log(this.newClient)
            var vm = this
            axios.post(urlBase +  "/client", this.newClient, { headers: {
            'content-type': 'multipart/form-data'}} )
              .then(response => {
                  // JSON responses are automatically parsed.
                  vm.clients.push(response.data)
                    this.clearClient()
                    alert("Client Added")
                })
                .catch(e => {
                  console.log(e)
                })

        },


        getComission: function(comissionId){

            for(i = 0; i < this.comissions.length; i++){
                if(comissionId == this.comissions[i].Id){
                    return this.comissions[i].name
                    break
                }
            }

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