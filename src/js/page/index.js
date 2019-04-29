define(['mui','util'],function(mui,util){

    const init=()=>{
        getUserInfo()
    }
const getUserInfo=()=>{
    let userId=util.formatUrl().userId;
    mui.ajax("/usernameInfo",{
        data:{
            userId:userId
        },
        success(rs){
            if(rs.code){
                let data=rs.data;
                render(data[0])
            }
        }
    }
    )
}



    const render=(data)=>{
        document.querySelector(".img").src="img/"+data.img;
        document.querySelector(".username").innerHTML=data.name;
        document.querySelector(".days").innerHTML=data.timeday+"天";
        document.querySelector(".number").innerHTML=data.number+"天";
        document.querySelector(".colre").innerHTML=data.colre+"%";
    }
    init()
})