const express = require("express");
const bodyParser = require ("body-parser");
const request = require("request");
const https= require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
     const firstName= req.body.fname;
     const lastName= req.body.lname;
     const email= req.body.email;
     const data={
        members: [{
            email_address: email,
            status: "Subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
     };
    const jsonData= JSON.stringify(data); 

    const url= "https://us21.api.mailchip.com/3.0.80/lists/4432f035a3"; 

    const options={
       mathod: "POST",
       auth:
       "Supriyo:398a1edbe52c5fd6ff650989d094643e-us21"
    }
    
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.send("Successfully Subscribed!");
        }
        else{
            res.send("There was an error, please try again!");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end;
});

app.listen(3000, function(){
    console.log("server is running on port 3000");
});



