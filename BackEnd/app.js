
const express = require('express');
const cors = require('cors');   
const bodyParser = require('body-parser');
const appRoutes = require('./Routes/route.js');
//---------------------------------------------------------------

const app = express();

//---------------------------------------------------------------

app.use(cors());
app.use(bodyParser.json({extended: false}));

//--------------------------------------------------------------

app.use('/bookingApp', appRoutes);

app.listen(8000);