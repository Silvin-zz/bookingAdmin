const Configuration = { 

    template: '#config-commision'  ,

    data: function(){
                                
        return{
           
            comissions:[
                {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false},
            ],

            newComission : {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false}
        }

    },

    methods:{

        load: function() {

            var vm = this

            axios.get(urlBase +  "/comission")
              .then(response => {
                  vm.comissions = response.data
                    console.log(vm.comissions)
                })
                .catch(e => {
                  console.log(e)
                })

        },

        getValue: function(comission){
            if (comission.IsPercent == true){
                return comission.Value + ".00 %"
            }
            return "$ " + comission.Value + ".00";
        },


        IsDefaultComission: function(comission){
            if (comission.IsDefault == true){
                return "YES"
            } else{
                return "NO"
            }
        },


        saveComission: function(){
            console.log(".....................................................")
            var vm = this
            axios.post(urlBase +  "/comission", this.newComission, { headers: {
            'content-type': 'multipart/form-data'}} )
              .then(response => {
                  // JSON responses are automatically parsed.
                  vm.comissions.push(response.data)
                    this.clearNewComission()
                    alert("Comission Added")
                })
                .catch(e => {
                  console.log(e)
                })
        },

        clearNewComission: function(){

            this.newComission = {  Id: "", name: "", Value: 0, IsPercent: false, IsDefault: false}
        }


    },
    created: function(){
        
        this.load()
    }

}