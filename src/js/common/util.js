define(function(){
    return {
        formatUrl:function(){
            //location.search获取地址栏？号传参的信息。
         let param=location.search;
         if(!param){
            return 
         }
       //  JSON.parse()字符串转对象的。
      return JSON.parse('{"'+param.slice(1).replace(/=/g,'":"').replace(/&/g,'","')+'"}');
        }
    }
})