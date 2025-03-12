import { remultExpress } from 'remult/remult-express'
import { Task } from '../shared/Task.js'
import { TasksController } from '../shared/TasksController.js'
import { AuthController } from '../shared/AuthController.js'

export const api = remultExpress({
    entities: [Task],
    admin: true, // enable admin ui
    controllers: [TasksController, AuthController], // add custom controller
    getUser: (req) => req.session!['user'], // use session to get user
})