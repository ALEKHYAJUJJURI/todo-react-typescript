var express = require('express')
var mongoDb = require('mongodb').MongoClient;

var cors = require("cors");
 
var app = express();
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

var conString = "mongodb://127.0.0.1:27017"
app.get("/users",(req,res)=>{
    mongoDb.connect(conString).then(cliObj=>{
        var databse = cliObj.db("todo-react");
        databse.collection("userTbl").find({}).toArray().then(doc=>{
            console.log('got details');
            res.send(doc);
            res.end();
        })

    })
});

app.post("/register",(req,res)=>{
    var user = {
        UserId:req.body.UserId,
        UserName:req.body.UserName,
        Password:req.body.Password,
        Mobile:req.body.Mobile,
        Email : req.body.Email
    }
    mongoDb.connect(conString).then(cliObj=>{
        var databse  = cliObj.db("todo-react");
        databse.collection('userTbl').insertOne(user).then(()=>{
            console.log("Registered Successfully");
            res.end();
        })
    })
})

app.put('/edit/:id',(req,res)=>{
    mongoDb.connect(conString).then(cliObj=>{
        var databse = cliObj.db('todo-react');
        databse.collection('userTbl').updateOne({id:req.params.UserId},{$set:{UserId:req.body.UserId,UserName:req.body.UserName,Password:req.body.Password,Mobile:req.body.Mobile,Email:req.body.Email}});
        console.log("Updated Successfully");
        res.end();
    })
});

app.delete('/delete/:userId',(req,res)=>{
    mongoDb.connect(conString).then(cliObj=>{
        var databse = cliObj.db('todo-react')
        databse.collection('userTbl').deleteOne({userId:req.params.UserId})
        console.log('Record Deleted Successfully')
        res.end()
    })
})

//appointments API

app.get("/appointments/:id",(req,res)=>{
    mongoDb.connect(conString).then(cliObj=>{
        var databse = cliObj.db("todo-react");
        databse.collection("appointmentsTbl").find({UserId:req.params.id}).toArray().then(doc=>{
            console.log('got Appointment details');
            res.send(doc);
            res.end();
        })

    })
}); 

app.post("/add-appointment",(req,res)=>{
    var appointment = {
        Appointment_id : parseInt(req.body.Appointment_id),
        Title : req.body.Title,
        Description : req.body.Description,
        Date : new Date(req.body.Date),
        UserId : req.body.UserId
    }
    mongoDb.connect(conString).then(cliObj=>{
        var databse  = cliObj.db("todo-react");
        databse.collection('appointmentsTbl').insertOne(appointment).then(()=>{
            console.log("Appointment Registered Successfully");
            res.end();
        })
    })
});

app.put('/edit-appointment/:id',(req,res)=>{
    mongoDb.connect(conString).then(cliObj=>{
        var databse = cliObj.db('todo-react');
        databse.collection('appointmentsTbl').updateOne({Appointment_id:req.params.id},{$set:{Appointment_id:parseInt(req.body.Appointment_id),Title:req.body.Title,Description:req.body.Description,Date:new Date(req.body.Date),UserId:req.body.UserId}}).then(()=>{
            console.log("Appointment Updated Successfully");
        res.end();
        })
        
    })
});

app.delete('/delete/:id',(req,res)=>{
    mongoDb.connect(conString).then(cliObj=>{
        var databse = cliObj.db('todo-react')
        databse.collection('appointmentsTbl').deleteOne({Appointment_id:parseInt(req.params.id)}).then(()=>{
            console.log('Appointment Record Deleted Successfully..')
        res.end()
        })
        
    })
})

app.listen(8080)
console.log("Server started : http://127.0.0.1:8080")
