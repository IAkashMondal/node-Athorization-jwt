const express =require("express");
const jwt =require("jsonwebtoken");
const {connection} =require("./configs/db")
const {UserModel}=require("./models/user.model")
const app=express();
 app.use(express.json());

app.get("/",async(req,res)=>{
    const user = await UserModel.find();
    console.log(user);
    res.send(`WEll come home \n ${user}`);
})

app.get("/cart",async(req,res)=>{
    const token= req.headers.authorization;
    jwt.verify(token, 'secrect_key_masai', async(err, decoded) =>{
        if(err){
            console.log("Login first");
            res.send("Login first");
        }
        else{
                const user = await UserModel.find();
                console.log(user);
                res.send(user);
        }
      });



})

app.post("/register",async(req,res)=>{
    const payload= req.body;
    try{

        const user= new UserModel(payload);
        user.save();
        
        res.send({"massege":`User register`});

    }
    catch(err){
        console.log({"massge":"register link not working",err});
        res.send(err)
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user= await UserModel.find({email,password});
        const token = jwt.sign({ payload_course: 'nem11' }, 'secrect_key_masai');
        if(user.length>0){
        console.log(user,"login user deatils");
        res.send({"massege":"User login","token":token});
        }
        else{
            res.send({"massege":"wrong credentials"});
        }
    }
    catch(err){
        console.log({"massege":"login faild",err});
        res.send(err)
    }
})






app.listen(4500,async(req,res)=>{
   try{
    await connection 
    console.log(`listen on 4500\nconnected to the DB`)
   }
   catch(err){
    console.log(`someting went wrong on port & connection \n${err} `)
   }
})