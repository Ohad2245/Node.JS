const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})

app.put('/update/:name', (req, res)=>{
    let signArr = JSON.parse(fs.readFileSync('name.json').toString());

    // find() -> return the first element that return true for condition:
    let mySign = signArr.find(x => x.name === req.params.name);

    if(mySign != undefined){
        mySign.year = req.body.year;
        fs.writeFileSync('name.json', JSON.stringify(signArr));
    }

    res.status(200); // OK
    res.send('Name updated successfully')
});

app.delete('/delete/:name', (req, res)=>{
    let musicArr = JSON.parse(fs.readFileSync('name.json').toString());

    let len = signArr.length;
    signArr = signArr.filter(s => s.id !== req.params.id);

    if(signArr.length < len){
        fs.writeFileSync('name.json', JSON.stringify(signArr));
        res.send('Name was deleted successfully')
    }
})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);



console.log("Listening on PORT 3000");