define(['mui'],function(mui){

    const init=()=>{
        mui.init()
        btnEvent()
    }

   const btnEvent=()=>{
    let btn=document.querySelector("#btn");
    btn.onclick=function(){
        let userVal=document.querySelector(".users").value.trim();
        let logVal=document.querySelector(".logins").value.trim();
        if(!userVal && !logVal){
            return
        }
            mui.ajax("/users/login",{
                type:"post",
                data:{
                    user:userVal,
                    pwd:logVal
                },
                success(rs){
                    if(rs.code){
                        // console.log(rs.data[0]._id)
                        location.href="../../index.html?userId="+rs.data[0]._id
                    }
                }
            })
        
    }
   } 
    init()
})