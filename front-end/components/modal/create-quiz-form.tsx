"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from 'lucide-react'

export function CreateQuizForm() {
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log({ title, description })
		setOpen(false)
		setTitle('')
		setDescription('')
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle className="mr-2 h-4 w-4" /> Create New Quiz
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Quiz</DialogTitle>
					<DialogDescription>
						Fill in the details for your new quiz. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="flex flex-col gap-3">
							<Label htmlFor="title" className="font-medium">
								Title
							</Label>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="col-span-3"
								required
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Label htmlFor="description" className="font-medium">
								Description
							</Label>
							<Textarea
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="col-span-3"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Create Quiz</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

