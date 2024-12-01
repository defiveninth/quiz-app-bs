"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Edit, Trash2, Menu, X, LogOut } from 'lucide-react'
import { ThemeSwitchButton } from '@/components/theme/switch-button'
import Header from '@/components/header'

const quizzes = [
	{
		id: "quiz1",
		title: "General Knowledge Quiz",
		description: "Test your knowledge on a variety of topics including history, science, and pop culture."
	},
	{
		id: "quiz2",
		title: "JavaScript Basics",
		description: "A quiz to assess your understanding of JavaScript fundamentals, including variables, functions, and loops."
	},
	{
		id: "quiz3",
		title: "World Capitals",
		description: "Challenge yourself to name the capitals of various countries around the world."
	},
	{
		id: "quiz4",
		title: "Math Quiz",
		description: "Solve these math problems to prove your number-crunching skills."
	},
	{
		id: "quiz5",
		title: "Science Facts",
		description: "A fun quiz about fascinating science facts across physics, chemistry, and biology."
	}
]

export default function DashboardPage() {
	const [searchTerm, setSearchTerm] = useState("")

	const filteredQuizzes = quizzes.filter(quiz =>
		quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
		quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='w-full min-h-screen'>
			<div className='container mx-auto px-5 pt-5'>
				<Header />

				<div className="relative mb-6">
					<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
					<Input
						type="text"
						placeholder="Search quizzes..."
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredQuizzes.map((quiz) => (
						<Card key={quiz.id}>
							<CardHeader>
								<CardTitle>{quiz.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600">{quiz.description}</p>
							</CardContent>
							<CardFooter className="flex justify-end space-x-2">
								<Button variant="outline" size="sm">
									<Edit className="mr-0 h-4 w-4" /> Edit
								</Button>
								<Button variant="destructive" size="sm">
									<Trash2 className="mr-0 h-4 w-4" /> Delete
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>

		</div>
	)
}

