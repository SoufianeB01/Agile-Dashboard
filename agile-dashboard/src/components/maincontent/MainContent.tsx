
import { useState } from 'react'
import type { Task, TaskStatus } from '../../types/task.ts'
import './MainContent.css'

const initialTasks: Task[] = [
  { id: 1, title: 'Build REST API', status: 'in_progress', priority: 'high' },
  { id: 2, title: 'Create login page', status: 'todo', priority: 'medium' },
  { id: 3, title: 'Set up project structure', status: 'done', priority: 'low' },
  { id: 4, title: 'Implement authentication', status: 'todo', priority: 'high' },
  { id: 5, title: 'Write unit tests', status: 'in_progress', priority: 'medium' }
]

const columns: { title: string; status: TaskStatus }[] = [
  { title: 'To Do', status: 'todo' },
  { title: 'In Progress', status: 'in_progress' },
  { title: 'Done', status: 'done' }
]

function MainContent() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const completed = tasks.filter(task => task.status === 'done').length
  const inProgress = tasks.filter(task => task.status === 'in_progress').length

  const updateTaskStatus = (id: number, status: TaskStatus) => {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  const addTask = () => {
    const title = window.prompt('Enter task title')

    if (!title?.trim()) return

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      status: 'todo',
      priority: 'medium'
    }

    setTasks(previousTasks => [...previousTasks, newTask])
  }

  return (
    <main className="main-content">
      <div className="page-header">
        <div>
          <p className="breadcrumb">Workspace / Sprint 1</p>
          <h1>Sprint Overview</h1>
          <p className="page-subtitle">
            Track your team's progress and manage sprint tasks.
          </p>
        </div>

        <button className="add-task-button" onClick={addTask}>
          + Add Task
        </button>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total Tasks</span>
          <strong>{tasks.length}</strong>
        </div>

        <div className="stat-card">
          <span>In Progress</span>
          <strong>{inProgress}</strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>
      </section>

      <section className="board-section">
        <div className="board-heading">
          <h2>Sprint Board</h2>
          <span>Sprint 1</span>
        </div>

        <div className="kanban-board">
          {columns.map(column => {
            const columnTasks = tasks.filter(
              task => task.status === column.status
            )

            return (
              <div className="kanban-column" key={column.status}>
                <div className="column-header">
                  <h3>{column.title}</h3>
                  <span className="task-count">{columnTasks.length}</span>
                </div>

                {columnTasks.map(task => (
                  <div className="task-card" key={task.id}>
                    <div className="task-card-top">
                      <span className="task-id">
                        TASK-{task.id}
                      </span>
                      <span className={`priority priority-${task.priority}`}>
                        {task.priority}
                      </span>
                    </div>

                    <h4>{task.title}</h4>

                    <select
                      value={task.status}
                      onChange={event =>
                        updateTaskStatus(
                          task.id,
                          event.target.value as TaskStatus
                        )
                      }
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default MainContent
