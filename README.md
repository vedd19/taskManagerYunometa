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


