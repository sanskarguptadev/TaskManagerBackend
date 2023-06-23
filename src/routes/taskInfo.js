const taskRoutes = require('express').Router();
const task = require('../tasks.json');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const validator = require('../helper/validator');


taskRoutes.use(bodyParser.urlencoded({ extended: true }));
taskRoutes.use(bodyParser.json());

taskRoutes.get('/', (req, res) => {
    const status = req.query.status;
    const sort = req.query.sort;
    let taskData = task;
    if (typeof(Boolean(status)) === 'boolean' || status) {
        if(Boolean(status) === true || Boolean(status) === false) {
            taskData = taskData.filter(tsk => status === String(tsk.status));
        } else if (status) {
           res.status(400).send("Please Define Correct Status");
        }
        if(Boolean(sort) === true || Boolean(sort) === false) {
            taskData.sort((a, b) => a.creationDate.localeCompare(b.creationDate));
        }
        res.status(200).send(taskData);
    } else {
        res.status(200);
        res.send(taskData);
    }
});

taskRoutes.get('/:taskId', (req, res) => {
    let taskData = task;
    let askedTaskId = req.params.taskId;
    let result = taskData.filter(val => val.id == askedTaskId);

    res.status(200).send(result);
});

taskRoutes.get('/priority/:type', (req, res) => {
    let taskData = task;
    let priorityType = req.params.type;
    if (priorityType === 'high' || priorityType === 'medium' || priorityType === 'low') {
        let result = taskData.filter(val => val.priority === priorityType);
        res.status(200).send(result);
    } else {
        res.status(400).send('Tasks should either be high, medium or low priority only.');
    }

});

taskRoutes.post('/', (req, res) => {
    const taskDetails = req.body;
    taskDetails.creationDate = new Date();
    if(validator.validateTaskInfo(taskDetails, task).status) {
        let wrPath = path.join(__dirname, '..', 'tasks.json');
        let taskData = task;
        taskData.push(taskDetails);
        fs.writeFileSync(wrPath, JSON.stringify(taskData), {encoding: 'utf8', flag: 'w'});
        res.status(200).send("Task has been added successfully");
    } else {
        res.status(500).json(validator.validateTaskInfo(taskDetails, task));
    }
});

taskRoutes.put('/:taskId', (req, res) => {
    const taskDetails = req.body;
    let askedTaskId = req.params.taskId;
    let index = task.findIndex(tsk => askedTaskId == tsk.id);
    if(validator.validateUpdateTaskInfo(taskDetails).status && index !== -1) {
        task[index].title = taskDetails.title;
        task[index].description = taskDetails.description;
        task[index].status = taskDetails.status;
        task[index].priority = taskDetails.priority;
        res.status(200).send("Task has been updated successfully");
    } else if(index === -1) {
        res.status(400).send("Task Id not found!!");
    } else {
        res.status(500).json(validator.validateUpdateTaskInfo(taskDetails));
    }
});

taskRoutes.delete('/:taskId', (req, res) => {
    let askedTaskId = req.params.taskId;
    let index = task.findIndex(tsk => askedTaskId == tsk.id);
    if(index === -1) {
        res.status(400).send("Task Id not found!!");
    } else{
        task.splice(index, 1)
        let wrPath = path.join(__dirname, '..', 'tasks.json');
        fs.writeFileSync(wrPath, JSON.stringify(task), function(err) {
            if(err) throw err;
            console.log('Replaced!');
        });
        res.status(200).send("Task Deleted Successfully!!!");
    }
});

module.exports = taskRoutes;