import { useDrag, useDrop } from "react-dnd"
import { Task } from "../page"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type PriorityTasksProps = {
  tasks: Task[]
  updateTaskPriority: (taskId: string, newPriority: "low" | "medium" | "high") => void
}

export default function PriorityTasks({ tasks, updateTaskPriority }: PriorityTasksProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  return (
    <div className="space-y-4">
      {sortedTasks.map((task, index) => (
        <PriorityTaskItem
          key={task.id}
          task={task}
          index={index}
          updateTaskPriority={updateTaskPriority}
        />
      ))}
    </div>
  )
}

type PriorityTaskItemProps = {
  task: Task
  index: number
  updateTaskPriority: (taskId: string, newPriority: "low" | "medium" | "high") => void
}

function PriorityTaskItem({ task, index, updateTaskPriority }: PriorityTaskItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "PRIORITY_TASK",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "PRIORITY_TASK",
    hover: (draggedItem: { id: string; index: number }) => {
      if (draggedItem.index !== index) {
        // Implement the logic to reorder tasks here
      }
    },
  })

  const priorityColors = {
    high: "bg-red-100 border-red-500",
    medium: "bg-yellow-100 border-yellow-500",
    low: "bg-green-100 border-green-500",
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-4 rounded-lg shadow-sm border-2 ${
        priorityColors[task.priority]
      } ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{task.name}</span>
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
  )
}

