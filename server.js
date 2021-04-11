// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
app.listen(port, ()=>{
    console.log(`Server Running On: http://localhost:${port}`);
});
//initialize all route with a callback function
app.get('/getAll',(request,response)=>{
    response.send(projectData).status(200).end();
});


app.post('/postData', (request,response)=>{
    projectData={
        temp: request.body.temp,
        date: request.body.date,
        content: request.body.content
    }
    response.send(projectData).status(200).end();
});
