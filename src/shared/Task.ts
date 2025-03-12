import { Entity, Fields, Allow } from 'remult'

@Entity('tasks', {
    allowApiCrud: Allow.authenticated, // only authenticated users can create, read, update, and delete tasks
})

export class Task {
    @Fields.cuid()
    id = ''

    @Fields.string<Task>({
        validate: (task) => {
            if (task.title.length < 3) throw "Too short"
        }
    })
    title = ''

    @Fields.boolean()
    completed = false

    @Fields.createdAt()
    createdAt?: Date
}