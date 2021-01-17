const express = require("express");
const api = express();
const mongoose = require("mongoose");
const cors = require('cors');
// This is called only in the dev environment
const data = require('./API/initializers/data');
const path = require('path');

data.addQuestionsToDatabase();
data.addPersonalityToDatabase();
data.addMotivationToDatabase();
data.addDailiesToDatabase();

// Routes
const userRoutes = require('./API/routes/user');
const DISCRoutes = require('./API/routes/DISC');
const MotivationRoutes = require('./API/routes/motivation');
const dailiesRoutes = require('./API/routes/dailies');

api.use(express.json())
api.use(cors())
api.use(express.static(path.join(__dirname, 'frontend', 'build')));

mongoose.connect(
    `mongodb+srv://haato:${process.env.MONGODB_PASS}@cluster0.2abxv.mongodb.net/ProjectX?retryWrites=true&w=majority`,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

api.use('/api/v1/user', userRoutes);
api.use('/api/v1/disc', DISCRoutes);
api.use('/api/v1/motivation', MotivationRoutes);
api.use('/api/v1/dailies', dailiesRoutes);

api.get('api/v1/ping', (req, res) => {
    res.status(200).json({
        message: "pong!"
    });
})

api.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
})

api.listen(process.env.PORT || 8080)