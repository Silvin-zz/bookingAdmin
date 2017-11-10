const  Events       = { 
	template: '#client-events',
	data: function(){
                                
        return{
           
            events:[
                { Id: "", Name: "", Commision: {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false} },
            ],

			comissions:[
                {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false, Color: ""},
            ]
        }
	},
	//class="card-body bg-danger"
	methods:{
		load: function() {

            var vm = this

            axios.get(urlBase +  "/event")
              .then(response => {
                  vm.events = response.data
					console.log(vm.events)
                    
					axios.get(urlBase +  "/comission")
		              .then(response => {
						  	comissionClass 	= ["bg-success", "bg-warning", "bg-primary", "bg-light", "bg-danger", "bg-info"]
							index          	= 0
		                  	vm.comissions 	= response.data
							for(i = 0; i < vm.comissions.length; i++){
								vm.comissions[i].Color = comissionClass[index]
								index++
								if (index >= vm.comissions.length){
									index 	= 0
								}
							}
		                    console.log(vm.comissions)
							console.log("===============================================")
							
		                })
		                .catch(e => {
		                  console.log(e)
		                })

                })
                .catch(e => {
                  console.log(e)
                })
        },

		getCommisionClass: function(comissionId){

			for(i = 0; i < this.comissions.length; i++){
                if(comissionId == this.comissions[i].Id){
                    return "card-body " + this.comissions[i].Color
                    break
                }
            }


		}


	},
	created:function(){
		this.load();
	}
}