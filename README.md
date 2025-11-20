links : https://mern-taskmanager-theta.vercel.app/
This is the deployed link of vercel. 
Go through and precautions : As soon as the link is opened you will be redirected to the application, A default login page will appear with demo credentials, just click log in and it will take you to the /home route.
 
 The project is working great, user can add , delete and update tasks, the application is connected to the remote mongoDB Atlas so there already presents some testing data to understand the flow much better.

 Implemented pagination, when in only 3 tasks will be shown in one page and we can navigate through.
 Also Implemented a Filter by status feature, in which user can filter all his tasks and see which tasks are pending and which are completed and take relevent actions, may be delete the completed tasks, edit the pending tasks, or create a new task.

# TECH STACKS 
`Frontend`

React

Context Apis

React Router

Axios

Tailwind css

`Backend`

Node.js

Express.js

MongoDB Atlas/ Mongoose










# Task APIs Documentation

### Endpoint

`Post /api/tasks`

# Description 
This endpoint allows users to add a new task.

# Example Request Body
`title` :"(string)......",
`description` : "(string)............",
`status` : enum["in progress", "pending", "completed"]

# Success Response
"status code" : "201"
"message": "Task added"

# Error Response

"status code": 400

{
    "error": [
        {
            "type": "field",
            "value": "",
            "msg": "Title can not be empty",
            "path": "title",
            "location": "body"
        }
    ]
}





### Endpoint

`GET /api/tasks`

# Description 
This endpoint allows to get all the tasks.

# Success Response
"status code" : "200"
{
    `allTasks`:[{...},{...}]
}

# Error Response
"status code": 400


