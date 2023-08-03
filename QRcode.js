const qr = require ("qrcode");
let data = {
    "id":123,
    "name":"name",
    "email":"email",
    "gender":"gender"
    
};
let stJson = JSON.stringify(data);
qr.toString(stJson,{type:"terminal"},function(err,code){
    if(err) {
     return   console.log("error");
    }
    console.log(code);
});
qr.toFile("f1.png",stJson,function(err){
    if(err) {
     return   console.log("error");
    }
});