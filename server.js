// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

//spin up the server
const server = app.listen(port,listening);

// callback to debug
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

//initialize all route with a callback function
app.get('/all',sendData);

//callback function to complete get '/all'
function sendData(req,res){
    res.send(projectData);
    projectData =[];
}
app.post('/add',addData);
function addData (req,res){
    console.log(req.body);
    newEntry={
        data: req.body.data,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData.push(newEntry)
}