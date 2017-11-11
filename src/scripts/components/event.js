const  Events       = { 
    template: '#client-events',
    data: function(){
                                
        return{
           
            events:[
                { Id: "", Name: "", Commision: {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false}, ClientId: "" },
            ],

            comissions:[
                {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false, Color: ""},
            ],
            searchText: "",

            newEvent : { Id: "", Name: "", Commision: {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false} },

            selectedEvent: { Id: "", Name: "", TicketCost: 100.00, TicketQuantity:1, Subtotal: 0, TotalComission: 0, Cost:0,  Commision: {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false} },

            clients:[
                {  Id: "", Name: "", Username: "", Comission: "", ClientId: ""},
            ],

            Subtotal:0,
            TotalComission: 0,
            Cost: 0

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
                    


                    axios.get(urlBase +  "/client")
                      .then(response => {
                          // JSON responses are automatically parsed.
                          vm.clients = response.data
                        })
                        .catch(e => {
                          console.log(e)
                        })


                    axios.get(urlBase +  "/comission")
                      .then(response => {
                            comissionClass  = ["bg-success", "bg-warning", "bg-primary", "bg-light", "bg-danger", "bg-info"]
                            index           = 0
                            vm.comissions   = response.data
                            for(i = 0; i < vm.comissions.length; i++){
                                vm.comissions[i].Color = comissionClass[index]
                                index++
                                if (index >= vm.comissions.length){
                                    index   = 0
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


        },


        getValueComission: function(comission){
            if (comission.IsPercent == true){
                return comission.Value + ".00 %"
            }
            return "$ " + comission.Value + ".00";
        },

        saveEvent: function(){

            var vm                  = this
            idComission             = this.newEvent.Comission
            this.newEvent.Commision = this.getComissionById(idComission)
            
            axios.post(urlBase +  "/event", this.newEvent, { headers: {
            'content-type': 'multipart/form-data'}} )
              .then(response => {
                  // JSON responses are automatically parsed.
                  vm.events.push(response.data)
                    this.clearEvent()
                    alert("Event Added")
                })
                .catch(e => {
                  console.log(e)
                })
        },


        showCalculate: function(event){
            
            this.selectedEvent                  = event
            this.selectedEvent.TicketQuantity   = 1
            this.selectedEvent.TicketCost       = 100.00
            this.calculateCost()  
        },


        passEvent:function(event){

            this.selectedEvent = event;
            this.calculateCost();
        },


        calculateCost:function(){


            extraCost = this.selectedEvent.Commision.Value;

            if (this.selectedEvent.Commision.IsPercent == true) {
                extraCost = (this.selectedEvent.Commision.Value / 100) * this.selectedEvent.TicketCost
            }


            this.Subtotal         = this.selectedEvent.TicketQuantity * this.selectedEvent.TicketCost
            this.TotalComission   = this.selectedEvent.TicketQuantity * extraCost
            this.Cost             = this.Subtotal       + this.TotalComission
                

        },


        clearEvent: function(){
            this.newEvent = { Id: "", Name: "",  Commision: {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false} }
        },

        getComissionById(Id){
            for (i = 0; i < this.comissions.length; i++){

                console.log(this.comissions[i].Id)
                console.log(Id)
                if (this.comissions[i].Id == Id){
                    return this.comissions[i];
                    break;
                }
            }
        }


    },
    created:function(){
        this.load();
    }
}