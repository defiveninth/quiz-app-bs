import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateQuestionDto } from './question.dto'
import { UpdateQuestionDto } from './question.dto'

@Injectable()
export class QuestionsService {
	constructor(private prisma: PrismaService) { }

	async createQuestion(createQuestionDto: CreateQuestionDto) {
		const { text, quizId, options } = createQuestionDto
		const question = await this.prisma.question.create({
			data: {
				text,
				quizId,
				options: {
					create: options.map((option) => ({
						text: option.text,
						isCorrect: option.isCorrect,
					})),
				},
			},
			include: { options: true },
		})
		return question
	}

	async getAllQuestions() {
		try {
			const questions = await this.prisma.question.findMany({
				include: { options: true },
			})
			return questions
		} catch (error) {
			throw new Error(`Failed to retrieve questions: ${error.message}`)
		}
	}

	async getQuestionById(id: string) {
		try {
			const question = await this.prisma.question.findMany({
				where: { quizId: id },
				include: { options: true },
			})

			if (!question) {
				throw new NotFoundException(`Question with ID ${id} not found`)
			}

			return question
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error
			}
			throw new Error(`Failed to retrieve question: ${error.message}`)
		}
	}

	async deleteQuestion(id: string) {
		try {
			await this.prisma.question.delete({
				where: { id },
			})
		} catch (error) {
			throw new Error(`Failed to delete question: ${error.message}`)
		}
	}

	async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto) {
		const { text, options } = updateQuestionDto

		try {
			const updatedQuestion = await this.prisma.question.update({
				where: { id },
				data: {
					text,
					options: {
						upsert: options.map((option) => ({
							where: { id: option.id || '' },
							update: { text: option.text, isCorrect: option.isCorrect },
							create: { text: option.text, isCorrect: option.isCorrect },
						})),
					},
				},
				include: { options: true },
			})

			return updatedQuestion
		} catch (error) {
			throw new Error(`Failed to update question: ${error.message}`)
		}
	}
}

