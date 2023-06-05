function binary_tree (mb_arr,team_name){
    let len=mb_arr.length;
    var layer=Math.ceil(Math.log2(2*len));
    let sheet=new Array(Math.pow(2,layer)).fill(0);
    let mb=new Array(Math.pow(2,layer)).fill(0);
    set_mb(mb,len,1);
    set_name(mb,mb_arr,layer);
    set_sheet(sheet,mb,layer);
    storedata(team_name,sheet,mb);
    return{
        "sheet":sheet,
        "mb":mb
    }
}
function set_mb(arr,mb_count,index){
    arr[index]=mb_count;
    let nb_left=Math.floor(mb_count/2);
    let nb_right=mb_count-nb_left;
    if(nb_left!=1&&index*2<arr.length){set_mb(arr,nb_left,index*2);}
    else if(nb_left ==1){arr[index*2]=1;}
    if(nb_right!=1&&(index*2+1)<arr.length){set_mb(arr,nb_right,(index*2+1));}
    else if(nb_left ==1){arr[index*2+1]=1;}
}
function set_name(mb_arr,mb_name,layer){
    let start=Math.pow(2,layer-2);
    let j=0;
    for(let i=start;i<mb_arr.length;i++){
        if(mb_arr[i]==1){mb_arr[i]=mb_name[j];j++;}
    }
}
function set_sheet(sheet_arr,mb_arr,layer){
    let nb=101;
    let start=Math.pow(2,layer-1)-1;
    for(let i=start;i>=1;i--){
        if(mb_arr[i]>1){
            sheet_arr[i]=nb;
            nb++;
        }
    }
}
function storedata(team_name,sheet_data,mb_data) {
    db.collection("binary_tree").doc(team_name).set({
    sheet_data:sheet_data,
    mb_data:mb_data
    });
}
