const monggose =require("mongoose");
const connection=monggose.connect("mongodb://127.0.0.1:27017/UserDB")
module.exports={
    connection
}