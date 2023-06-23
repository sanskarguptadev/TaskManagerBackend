#####
1. Install Node Module using `npm Install`
2. Go inside the project repository
3. Run `npm start`

### Project Description
GET /tasks?status=`true || false`&sort=`true`: Retrieve all tasks. Users will be able to filter tasks based on completion status and sort them by creation date.
GET /tasks/:id: Retrieve a single task by its ID.
POST /tasks: Create a new task.
PUT /tasks/:id: Update an existing task by its ID.
DELETE /tasks/:id: Delete a task by its ID.
GET /tasks/priority/`high | medium | low`: retrieve tasks based on priority level