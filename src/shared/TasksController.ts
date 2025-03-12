import { BackendMethod, Allow, remult } from "remult";
import { Task } from './Task.js';

export class TasksController {
    @BackendMethod({ allowed: Allow.authenticated  })
    static async setAllCompleted(completed: boolean) {
        const taskRepo = remult.repo(Task)


        for (const task of await taskRepo.find()) {
            await taskRepo.save({ ...task, completed })
        }
    }
}