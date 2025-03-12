import { remultExpress } from 'remult/remult-express'
import { Task } from '../shared/Task.js'
import { TasksController } from '../shared/TasksController.js'

export const api = remultExpress({
    entities: [Task],
    admin: true, // enable admin ui
    controllers: [TasksController], // add custom controller
})