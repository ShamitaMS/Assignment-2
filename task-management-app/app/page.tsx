"use client"

import { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import WelcomeMessage from "./components/WelcomeMessage"
import AllTasks from "./components/AllTasks"
import PriorityTasks from "./components/PriorityTasks"
import AddTaskModal from "./components/AddTaskModal"
import TaskStatistics from "./components/TaskStatistics"
import SearchBar from "./components/SearchBar"
import { Button } from "@/components/ui/button"
import { PlusCircle, Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

export type Task = {
  id: string
  name: string
  description: string
  dueDate: Date
  priority: "low" | "medium" | "high"
  completed: boolean
  category: string
}

export default function TaskManagementApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const updateTaskPriority = (taskId: string, newPriority: "low" | "medium" | "high") => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    )
  }

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen p-4 transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <WelcomeMessage />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">All Tasks</h2>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </div>
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AllTasks
                tasks={filteredTasks}
                toggleTaskCompletion={toggleTaskCompletion}
                updateTaskPriority={updateTaskPriority}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Priority Tasks</h2>
              <PriorityTasks tasks={filteredTasks} updateTaskPriority={updateTaskPriority} />
              <TaskStatistics tasks={tasks} />
            </div>
          </div>
        </div>
      </div>
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={addTask}
      />
    </DndProvider>
  )
}

