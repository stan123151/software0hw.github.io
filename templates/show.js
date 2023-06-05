document.write('<script type="text/javascript" src="binary_tree.js"></script>'); 
document.write('<script type="text/javascript" src="get_firebase.js"></script>'); 
//initialize firebase
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

function set_text(arr){
    let str_arr=new Array(arr["sheet"][1]-100);
    let j=0;
    for(let i =arr["sheet"].length;i>0;i--){
        let str="";
        if(arr["sheet"][i]>0){
            str=arr["sheet"][i]+":";
            if(arr["mb"][i*2]>0){
                str+="尚未有結果";
            }else{
                str+=arr["mb"][i*2];
            }
            str+="vs";
            if(arr["mb"][i*2+1]>0){
                str+="尚未有結果";
            }else{
                str+=arr["mb"][i*2+1];
            }
            str_arr[j]=str;
            j++;
        }
    }
    return str_arr;
}

window.onload=async function(){
    let team_arr=await get_team();
    let tree_value=new Array(team_arr.length);
    console.log("team_arr",team_arr);
    for(let i=0;i<tree_value.length;i++)
    {
        tree_value[i]= await get_treedata("binary_tree",team_arr[i]);
    }
    console.log("tree_value",tree_value);
    var el =document.getElementById("main");
    let str_arr=new Array(team_arr.length);
    for(let i=0;i<team_arr.length;i++){
        str_arr[i]=set_text(tree_value[i]);
    }
//    tree[1]["sheet"][1]
    console.log("str_arr",str_arr);
    let str="<table>";
    str+="<tr><th>現在比到</th><th>現在比到</th></tr>";
    str+="<tr>";
    for(let i=0;i<team_arr.length;i++){
        str+="<td>";
        for( let j =0;j<str_arr[i].length;j++){
            str+='<p>'+str_arr[i][j]+'</p>';
        }
        str+="</td>";
    }
    str+="</tr>"
    str+="</table>";
    console.log(str);
    el.innerHTML=str;
}