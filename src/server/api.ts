import { remultExpress } from 'remult/remult-express'
import { Task } from '../shared/Task.js'
import { TasksController } from '../shared/TasksController.js'
import { AuthController } from '../shared/AuthController.js'
import { createPostgresDataProvider } from 'remult/postgres'

const DATABASE_URL = process.env["DATABASE_URL"];

export const api = remultExpress({
    entities: [Task],
    admin: true, // enable admin ui
    controllers: [TasksController, AuthController], // add custom controller
    getUser: (req) => req.session!['user'], // use session to get user
    dataProvider: DATABASE_URL
        ? createPostgresDataProvider({ connectionString: DATABASE_URL })
        : undefined, // use postgres data provider with your connection string  
})