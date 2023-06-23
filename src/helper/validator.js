class validator {
    static validateUniqueTaskId(taskInfo, taskData) {
        let found = taskData.some(el => el.id == taskInfo.id);
        if(found) return false;
        return true;
    }

    static validateTaskInfo(taskInfo, taskData) {
        if(
            taskInfo.hasOwnProperty("title") && taskInfo.hasOwnProperty("description") && taskInfo.hasOwnProperty("status") && taskInfo.hasOwnProperty("priority") && this.validateUniqueTaskId(taskInfo, taskData)
        ) {
            if(taskInfo.title === '') {
                return {
                    "status": false,
                    "message": "title can not be empty"
                };
            } else if(taskInfo.description === '') {
                return {
                    "status": false,
                    "message": "description can not be empty"
                };
            } else if(typeof(taskInfo.status) !== Boolean) {
                return {
                    "status": false,
                    "message": "Status should be Boolean"
                };
            }
            return {
                "status": true,
                "message": "task has been added"
            };
        }
        if(!this.validateUniqueTaskId(taskInfo, taskData)) {
            return {
                "status": false,
                "message": "task id has to be unique"
            };
        }
        return {
            "status": false,
            "message": "Data that you have provided is malformed please provide all the properties"
        };
    }

    static validateUpdateTaskInfo(taskInfo) {
        if(
            taskInfo.hasOwnProperty("title") && taskInfo.hasOwnProperty("description") && taskInfo.hasOwnProperty("status") && taskInfo.hasOwnProperty("priority")
        ) {
            if(taskInfo.title === '') {
                return {
                    "status": false,
                    "message": "title can not be empty"
                };
            } else if(taskInfo.description === '') {
                return {
                    "status": false,
                    "message": "description can not be empty"
                };
            } else if(typeof(taskInfo.status) !== Boolean) {
                return {
                    "status": false,
                    "message": "Status should be Boolean"
                };
            }
            return {
                "status": true,
                "message": "task has been updated"
            };
        }
        return {
            "status": false,
            "message": "Data that you have provided is malformed please provide all the properties"
        };
    }
}

module.exports = validator;