import { useState, useRef } from "react"
import { Task } from "../page"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDrag, useDrop } from "react-dnd"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

type AllTasksProps = {
  tasks: Task[]
  toggleTaskCompletion: (taskId: string) => void
  updateTaskPriority: (taskId: string, newPriority: "low" | "medium" | "high") => void
}

export default function AllTasks({
  tasks,
  toggleTaskCompletion,
  updateTaskPriority,
}: AllTasksProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "in-progress">("all")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "completed") return task.completed
    if (filter === "in-progress") return !task.completed
    return true
  })

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const dragTask = filteredTasks[dragIndex]
    const newTasks = [...filteredTasks]
    newTasks.splice(dragIndex, 1)
    newTasks.splice(hoverIndex, 0, dragTask)
    // Update the tasks array in the parent component
  }

  return (
    <Tabs defaultValue="all" className="mt-4">
      <TabsList>
        <TabsTrigger value="all" onClick={() => setFilter("all")}>
          All
        </TabsTrigger>
        <TabsTrigger value="completed" onClick={() => setFilter("completed")}>
          Completed
        </TabsTrigger>
        <TabsTrigger value="in-progress" onClick={() => setFilter("in-progress")}>
          In Progress
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            moveTask={moveTask}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTaskPriority={updateTaskPriority}
          />
        ))}
      </TabsContent>
      <TabsContent value="completed" className="mt-4">
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            moveTask={moveTask}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTaskPriority={updateTaskPriority}
          />
        ))}
      </TabsContent>
      <TabsContent value="in-progress" className="mt-4">
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            moveTask={moveTask}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTaskPriority={updateTaskPriority}
          />
        ))}
      </TabsContent>
    </Tabs>
  )
}

function TaskItem({
  task,
  index,
  moveTask,
  toggleTaskCompletion,
  updateTaskPriority,
}: {
  task: Task
  index: number
  moveTask: (dragIndex: number, hoverIndex: number) => void
  toggleTaskCompletion: (taskId: string) => void
  updateTaskPriority: (taskId: string, newPriority: "low" | "medium" | "high") => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "TASK",
    hover(item: { id: string; index: number }, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      moveTask(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drag(drop(ref))

  const handleCompletion = () => {
    toggleTaskCompletion(task.id)
    if (!task.completed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const categoryColors = {
    work: "bg-blue-200 text-blue-800",
    personal: "bg-green-200 text-green-800",
    shopping: "bg-yellow-200 text-yellow-800",
    health: "bg-red-200 text-red-800",
  }

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className={`p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleCompletion}
            className="mr-2"
          />
          <span className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
            {task.name}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[task.category]}`}>
            {task.category}
          </span>
          <Select
            value={task.priority}
            onValueChange={(value: "low" | "medium" | "high") =>
              updateTaskPriority(task.id, value)
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
        <p className="text-sm text-gray-700 dark:text-gray-300">{task.description}</p>
      </div>
    </motion.div>
  )
}

