import { FormEvent, useEffect, useState } from 'react'
import { remult } from 'remult'
import { Task } from './shared/Task'

const taskRepo = remult.repo(Task)

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const addTask = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle })
      setTasks([...tasks, newTask])
      setNewTaskTitle("")
    } catch (error: unknown) {
      alert((error as { message: string }).message)
    }
  }

  useEffect(() => {
    taskRepo
      .find({
        limit: 20,
        orderBy: { createdAt: 'asc' },
        // where: { completed: true },
      }).then(setTasks)
  }, [])
  return (
    <div>
      <h1>Tasks</h1>
      <main>
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={e => setNewTaskTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {
          tasks.map(task => {
            const setTask = (value: Task) =>
              setTasks(tasks => tasks.map(t => (t === task ? value : t)))
            const setCompleted = async (completed: boolean) =>
              setTask(await taskRepo.save({...task, completed }))
            return (
              <div key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={e => setCompleted(e.target.checked)}
                />
                {task.title}
              </div>
            )
          })
        }
      </main>
    </div>
  )
}