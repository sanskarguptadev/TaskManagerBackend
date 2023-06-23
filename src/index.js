const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('express').Router();
const taskController = require('./routes/taskInfo');

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.get('/', (req, res) => {
    res.status(200);
    res.send({ msg: 'AirTribe Project is Running' })
});

routes.get('/favicon.ico', (req, res) => {
    res.status(200);
    res.send('Project 1');
});

routes.use('/tasks', taskController);

app.listen(8000, (err) => {
    if(err) {
        console.log('Error', err);
    } else {
        console.log('Server Running');
    }
});
