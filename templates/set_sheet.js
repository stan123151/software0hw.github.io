//set name
let team_arr;
let participant_arr;
//get binary tree
let tree_value;
//get firebase team and participant
async function get_participant(){
    team_arr=await getdata("team","all_team");
    console.log("text:",team_arr);
    participant_arr=new Array(team_arr.length);
    for(let i =0;i<team_arr.length;i++){
        participant_arr[i]=await getdata("team",team_arr[i]);
    }
    console.log("participant:",participant_arr);
}
async function get_team(){
    team= await getdata("team","all_team");
    console.log("team",team);
    return team;
}
async function set_tree(){
    await get_participant();
    tree_value=new Array(team_arr.length);
    for(let i=0;i<team_arr.length;i++){
        tree_value[i]=binary_tree(participant_arr[i],team_arr[i]);
    }
    console.log("tree:",tree_value);
    console.log("tree:",tree_value);
}
