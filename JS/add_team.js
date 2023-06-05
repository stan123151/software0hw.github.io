
        <!--初始化 firebase-->
        var config = {
                apiKey: "AIzaSyB3nSFSeSeboRPnJHczrqJ8wC3bYaJCOBw",
                authDomain: "software0hw-defac.firebaseapp.com",
                databaseURL: "https://software0hw-defac-default-rtdb.firebaseio.com",
                projectId: "software0hw-defac",
                storageBucket: "software0hw-defac.appspot.com",
                messagingSenderId: "189289635598",
                appId: "1:189289635598:web:d4a3cfd6252eb6808c415f",
                measurementId: "G-WNGLH5K466"
            };
        firebase.initializeApp(config);

        var db = firebase.firestore();

        function storedata(h1,h2,data) {
          db.collection(h1).doc(h2).set({
            data
          });
          console.log("store ok!");
        }
        class inf {
            actors;
            date;
            desctiption;
            name;
            construct(data){
                this.actors=data.actors;
                this.date=data.date;
                this.desctiption=data.desctiption;
                this.name=data.name;
            }
        }
        var all_staff_nums=0
        var init=false
        var getdata_return_data=''
        function getdata(h1,h2) {
            return new Promise(function(resolve, reject){
                var actors=''

                var docRef = db.collection(h1).doc(h2);

                  docRef.get().then(function(doc) {
                      if (doc.exists) {
                        var doc_data = doc.data()
                        var get_data=''
                        console.log(doc_data);
                        get_data=doc.data().data;
                        console.log(doc_data.data.data);
                        if (get_data.length>0){
                            getdata_return_data=get_data;
                            console.log('123 ',doc_data.data);
                        }
                        else
                        {
                            getdata_return_data=[];
                        }
                        resolve();

                      } else {
                        console.log("找不到文件");
                      }
                    })
                    .catch(function(error) {
                      console.log("提取文件時出錯:", error);
                    });
                
                });
            }
        var all_option = []
        function set_select() {
            return new Promise(function(resolve, reject){
                console.log(getdata_return_data)
                if(getdata_return_data.length>0){
                    getdata_return_data.forEach(function(value){
                        if (init == false)
                        {
                            var opt = document.createElement('option');
                            opt.text = value;
                            document.getElementById("team_selct").appendChild(opt);
                            all_option.push(opt);
                        
                        }
                    });
                    console.log('set_select OK!')
                }
//                init=true
                resolve();
            });
        }
        function set_table() {
            return new Promise(function(resolve, reject){
                var table_team_staff = document.getElementById('show_list_staff');
                console.log(getdata_return_data)
                if(getdata_return_data.length>0){
                    getdata_return_data.forEach(function(value){

                         $("#show_list_staff").append("<li id='staff_content' style='width:200px;list-style-type: none ; text-align: center; border-radius:10px;' class='list-group-item'>"+value+"</li>");	//在ul標籤上動態新增li標籤
			             $("#li").attr("class",'list-group-item');		//為li標籤新增class屬性
                         $("#show_list_staff").append("<br id='staff_content'>")
                         all_staff_nums=all_staff_nums+2
//                        const row = document.createElement('li');
//                         row.innerHTML = `
//                                <li style='list-style-type:none' class="list-group-item"> ${value} </li>
//                                <br>
//                            `
//                         ;
//                         all_tr.push(row)
//                          // You could also do the same for the cells and inputs
//                         table_team_staff.appendChild(row);
                    });
                    console.log('set_table OK!')
                }
                resolve();
            });
        }
        var all_team=[]
        function set_all_team() {
            return new Promise(function(resolve, reject){
                if(getdata_return_data.length>0){
                    all_team=getdata_return_data   
                }
                resolve()
            });
        }
        
        function set_init_table(){
            return new Promise(function(resolve, reject){
                if(all_team.length>0)
                {
                    getdata('team',all_team[0]).then(set_table);
                }
                resolve()
            });
        }
        
        getdata('team','all_team').then(set_all_team).then(set_select).then(set_init_table);
        
            



        
        
//             function addRow() { //增加一行 
//                 var tableObj = document.getElementById('table_team_staff'); 
//                 var rowNums = tableObj.rows.length; 
//                 var newRow = tableObj.insertRow(rowNums); 
//                 var col1 = newRow.insertCell(0); 
//                 col1.innerHTML = value; 
//                 var col2 = newRow.insertCell(1); 
//                 col2.innerHTML = "$18.5"; 
//                 col2.align = "center"; 
//                 var divInfo = document.getElementById('displayInfo'); 
//                 divInfo.innerHTML = "新增商品成功"; 
//             } 
        
        

        function clear_option_tabel()
        {
            all_option.forEach(function(opt){
                document.getElementById("team_selct").removeChild(opt)                   
            })
            all_option=[]
            
            console.log(all_staff_nums)
            for(var i=0;i<all_staff_nums;i++)
            {
                event.preventDefault()
                $("#staff_content").remove();
            }
            
//            all_tr.forEach(function(value){
//            table_team_staff.removeChild(value)
//            })
//            all_tr=[]
        }
        var staff=[]
        window.onload = function(){ 
        document.getElementById("add_team_btn").addEventListener("click", function(event) {
            event.preventDefault();
            var input_team_name=document.getElementById("input_team_name").value;
            var input_team_staff=document.getElementById("input_team_staff").value;
            staff=[]
            staff.push(input_team_staff)
        function add_new_staff(){
            getdata_return_data.push(input_team_staff)
            storedata("team",input_team_name,getdata_return_data)
        }
        function check_team_exist(){
            if (all_team.length>0)
            {
                if(all_team.indexOf(input_team_name) == -1){
                    all_team.push(input_team_name)
                    storedata("team","all_team",all_team)
                    storedata("team",input_team_name,[input_team_staff])
                }
                else{
                    getdata('team',input_team_name).then(add_new_staff)
                }
            }
            else{
                all_team.push(input_team_name);
                storedata("team","all_team",all_team)
                storedata("team",input_team_name,[input_team_staff])
            }


        }
        
        console.log(all_team)

        check_team_exist()



//        storedata("team",input_team_name,data)
        document.getElementById("input_team_name").value='';
        document.getElementById("input_team_staff").value='';
        clear_option_tabel()
        getdata('team','all_team').then(set_all_team).then(set_select).then(set_init_table);
        return false;
    })
    
//        }
        
        

        
        
        
        
//        window.onload = function(){ 
        document.getElementById("del_team_btn").addEventListener("click", function(event) {
            event.preventDefault();
            var input_team_name=document.getElementById("input_team_name").value;
            var input_team_staff=document.getElementById("input_team_staff").value;
            
       

        function del_new_staff(){
            return new Promise(function(resolve, reject){
                all_staff=getdata_return_data
                index=all_staff.indexOf(input_team_staff)
                if(index > -1){
                    is_staff_here=true
                    all_staff.splice(index,1)
                    storedata("team",input_team_name,all_staff)
                }
                resolve()
            });
        }
        var is_staff_here=true
        function del_check_team_exist(){
             return new Promise(function(resolve, reject){
                if (all_team.length>0)
                {
                    if(all_team.indexOf(input_team_name) == -1){

                    }
                    else{
                        getdata('team',input_team_name).then(del_new_staff)
                    }
                }
                else{

                }
                resolve()
             });

        }
        del_check_team_exist()
        if(is_staff_here)
        {
            clear_option_tabel()
            getdata('team','all_team').then(set_all_team).then(set_select).then(set_init_table);
        }
        return false;
    })
        }
    




//option && myChart.setOption(option);
function select(){
	var selected = document.getElementById("team_selct").value;
    for(var i=0;i<all_staff_nums;i++)
        {
            event.preventDefault()
            $("#staff_content").remove();
        }
    getdata('team',selected).then(set_table)
};
