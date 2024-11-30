"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

type Priority = "low" | "medium" | "high"

interface Task {
	id: number
	title: string
	priority: Priority
	completed: boolean
}

const getPriorityBadge = (priority: Priority) => {
	switch (priority) {
		case "low":
			return <Badge variant="outline">Low</Badge>
		case "medium":
			return <Badge variant="secondary">Medium</Badge>
		case "high":
			return <Badge variant="destructive">High</Badge>
	}
}

export default function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([
		{ id: 1, title: "Complete project proposal", priority: "high", completed: false },
		{ id: 2, title: "Review team updates", priority: "medium", completed: false },
		{ id: 3, title: "Schedule team meeting", priority: "low", completed: true },
		{ id: 4, title: "Prepare presentation slides", priority: "high", completed: false },
		{ id: 5, title: "Update documentation", priority: "medium", completed: false },
	])

	const toggleTaskCompletion = (taskId: number) => {
		setTasks(tasks.map(task =>
			task.id === taskId ? { ...task, completed: !task.completed } : task
		))
	}

	return (
		<Card className="w-full max-w-3xl">
			<CardHeader>
				<CardTitle>Task List</CardTitle>
				<CardDescription>Manage your tasks and priorities</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="space-y-4">
					{tasks.map(task => (
						<li key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
							<div className="flex items-center space-x-4">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => toggleTaskCompletion(task.id)}
									className="text-gray-500 hover:text-gray-700"
								>
									{task.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
								</Button>
								<span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
							</div>
							<div className="flex items-center space-x-2">
								{getPriorityBadge(task.priority)}
								{task.completed && <Badge variant="secondary">Completed</Badge>}
							</div>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<div className="flex justify-between items-center w-full">
					<div className="space-x-2">
						<Badge variant="outline">Low</Badge>
						<Badge variant="secondary">Medium</Badge>
						<Badge variant="destructive">High</Badge>
					</div>
					<Badge variant="default">{tasks.length} Tasks</Badge>
				</div>
			</CardFooter>
		</Card>
	)
}