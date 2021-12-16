const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


app.use(cors());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", 
    "Origin, x-Requested-Width, Content-Type, Accept");
    next();
})

// parse application/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))

// parse application/json
app.use(bodyParser.json())

const serverAddress = 'localhost';
const portNumber = 4000;

const ConnectionString = 'mongodb+srv://katelyngraham:ZqcMzZ$8@cluster0.nqnxy.mongodb.net/Planner?retryWrites=true&w=majority';

mongoose.connect(ConnectionString, {useNewUrlParser: true});

const Schema = mongoose.Schema;

var meetSchema = new Schema({
    description:String,
    date:String,
    starttime:String,
    endtime:String,
    userId:String
});
var userSchema = new Schema({
    name:String,
    email:String,
    password:String
});

var MeetModel = mongoose.model("Meeting", meetSchema);
var UserModel = mongoose.model("User", userSchema);

app.get('/api/users', (req, res) => {

    console.log("Users called");
    UserModel.find((err, data) => {
        if(err) {
            res.json(error(err));
        }
        res.json(success(data));
    })
})

app.post('/api/user', (req, res) => {
    console.log('Register user');
    console.log(req.body);

    UserModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }, (err, user) => { 
        if(err) {
            res.json(error(err));
        }
        res.send(success(user));
    });

})

app.post('/api/login', async (req, res) => {
    console.log('Login user');
    console.log(req.body);

    const userList = await UserModel.find({
        email:req.body.email,
        password:req.body.password
    });

    if (userList == null || userList.length == 0) {
        console.log("Invalid user login attempt");
        res.send(error('Invalid email or password'));
    } else {
        console.log("User logged in");
        console.log(userList[0]);
        res.send(success({id: userList[0]._id, name: userList[0].name}));
    }
})

app.post('/api/logout', async (req, res) => {
    console.log('Logout user');
    console.log(req.body);

    UserModel.findById(req.body.userId, (err, user) => {
        if (err || user == null) {
            console.log("Attempt to logout with invlid user id");
            return res.send(error('Attempt to logout with invalid user id'));
        }
        res.send(success("Logged out"));
    });
})


/**
 * Get All Meetings
 */
app.get('/api/meetings', (req, res) => {

    console.log("Get Meetings called");
    MeetModel.find((err, data) => {
        if(err) {
            res.json(error(err));
        }
        res.json(success(data));
    })
})

/**
 * Get All Meetings for a specific User Id
 */
app.get('/api/meetings/:userid', (req, res) => {

    console.log("Get Meetings called for user id " + req.params.userid);
    MeetModel.find({
        userId: req.params.userid,
    }, (err, data) => {
        if(err) {
            res.json(error(err));
        }
        res.json(success(data));
    })
})


app.get('/api/meeting/:id', (req, res)=>{
    console.log(req.params.id);

    MeetModel.findById(req.params.id, (err, data) => {
        if(err) {
            res.json(error(err));
        }
        res.json(success(data));
    })
})

app.put('/api/meeting/:id', (req, res) => {
    console.log("Update Meeting: " + req.params.id);
    console.log(req.body);

    MeetModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, 
        (err, data) => {
            if(err) {
                res.json(error(err));
            }
            res.send(success(data));
        })
})

app.delete('/api/meeting/:id', (req, res) => {
    console.log('Deleting Meeting: ' + req.params.id);

    MeetModel.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            res.json(error(err));
        }
        res.send(success(data));
    })
})


app.post('/api/meeting', async (req, res) => {
    console.log('Create Meeting!');
    console.log(req.body);

    // make sure the user id exists
    UserModel.findById(req.body.userId, (err, user) => {
        if (err || user == null) {
            console.log("Attempt to add meeting with invlid user id");
            return res.status(403).send('Attempt to add meeting with invlid user id')
        }

        // create the meeting in mongodb
        MeetModel.create({
            description:req.body.description,
            date:req.body.date,
            starttime:req.body.starttime,
            endtime:req.body.endtime,
            userId:req.body.userId
        }, (err, meeting) => {
            if (err) {
                return res.send(error("Error creating meeting"));
            }            
            res.send(success(meeting) );
        });
        

    });


})

function error(details) {
    return {
        error: true,
        details: details
    };
}

function success(details) {
    return {
        error: false,
        details: details
    };
}

app.listen(port, () => {
    console.log("Planner Server listening at http://localhost:"+port)
})