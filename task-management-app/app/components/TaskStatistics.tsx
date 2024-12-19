import { Task } from "../page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type TaskStatisticsProps = {
  tasks: Task[]
}

export default function TaskStatistics({ tasks }: TaskStatisticsProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const priorityCounts = {
    high: tasks.filter((task) => task.priority === "high").length,
    medium: tasks.filter((task) => task.priority === "medium").length,
    low: tasks.filter((task) => task.priority === "low").length,
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Task Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Completion Rate</h3>
            <Progress value={completionRate} className="mt-2" />
            <p className="text-sm text-gray-500 mt-1">
              {completedTasks} out of {totalTasks} tasks completed
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Priority Distribution</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-center">
                <div className="text-red-500 font-bold">{priorityCounts.high}</div>
                <div className="text-xs text-gray-500">High</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-500 font-bold">{priorityCounts.medium}</div>
                <div className="text-xs text-gray-500">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-green-500 font-bold">{priorityCounts.low}</div>
                <div className="text-xs text-gray-500">Low</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

