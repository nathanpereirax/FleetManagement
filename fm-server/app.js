// import modules
const express= require('express');
const mongoose=require('mongoose');
const morgan= require('morgan');
const cors=require('cors');
require('dotenv').config();


// *************************************************************************
// app
const app=express();


// *************************************************************************
// middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials:true}));
app.use(express.json());


// *************************************************************************
// routes
const testRoutes=require("./routes/test");
app.use("/", testRoutes);


// *************************************************************************
// db
mongoose.connect(process.env.MONGO_URI, {
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const User = require('./models/User');

// Create an API endpoint to retrieve all users
app.get('/api/Users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

// Create an API endpoint to create a new user
app.post('/api/Users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating user' });
    }
});


// *************************************************************************
// port
const port = process.envPORT || 8080; // if env file is running then use that port itself, if not running then use 8080;


// *************************************************************************
// listener
const server=app.listen(port, ()=>
    console.log(`Server is running on port: ${port}`)
);