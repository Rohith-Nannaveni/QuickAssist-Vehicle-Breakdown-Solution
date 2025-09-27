const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');


const fs = require('fs').promises;
const path = require('path');
const configPath = path.resolve(__dirname,    'helpers', 'config.json');

const machineId = require('node-machine-id');
let machineID; // Declare machineID variable
let license ="u3Y65£,;7Y#I";

// Get the machine ID
machineId.machineId()
  .then(id => {
    machineID = id;
    //console.log('Machine ID:', id);
    //console.log('license ID:', license);
  })
  .catch(error => {
    console.error('Error getting machine ID:', error);
  });

  




require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());

//app.use(bodyParser.json());
app.use(morgan('tiny'));


//"email": "john.doe@example.com",
//"password": "yourpassword"

//Routes

const feedbackRoutes = require('./routes/feedback');
const locationRoutes = require('./routes/location');
const businessRoutes = require('./routes/business');
const usersRoutes = require('./routes/users');
const vendorRoutes = require('./routes/vendor');
const adminRoutes = require('./routes/admin');


const api = process.env.API_URL;


app.use(`${api}/business`, businessRoutes);
app.use(`${api}/location`, locationRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/vendor`, vendorRoutes);




//CONNECTION_STRING = 'mongodb://localhost:27017/';
//  http://localhost:4000/api/v1/business/

// Serve static files from the "public" directory
app.use('/public', express.static('public'));


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Add this line
    dbName: 'onroad'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(4000, ()=>{

    console.log('server is running http://localhost:4000');
})

//console.log('Database connection string:', process.env.API_URL);


{/*
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
*/}