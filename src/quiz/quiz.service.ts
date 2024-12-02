import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class QuizService {
	constructor(private readonly prismaService: PrismaService) { }

	async getAll() {
		return await this.prismaService.quiz.findMany({
			include: {
				questions: {
					include: {
						options: true
					}
				},
				teacher: {
					select: {
						avatarUrl: true,
						firstName: true,
						surname: true,
						email: true,
						id: true
					}
				}
			}
		})
	}

	async getResultsSingleQuiz(quizId: string) {
		const attempts = await this.prismaService.attempt.findMany({
			where: { quizId },
			include: {
				student: {
					select: {
						id: true,
						firstName: true,
						surname: true,
						email: true,
					},
				},
				quiz: {
					select: {
						id: true,
						title: true,
						questions: {
							select: {
								id: true,
								text: true,
							},
						},
					},
				},
			},
		})

		if (!attempts || attempts.length === 0) {
			throw new NotFoundException(`No results found for quiz with ID ${quizId}`)
		}

		const results = attempts.map((attempt) => ({
			studentId: attempt.student.id,
			studentName: `${attempt.student.firstName} ${attempt.student.surname}`,
			email: attempt.student.email,
			score: attempt.score,
			totalQuestions: attempt.quiz.questions.length,
			submittedAt: attempt.createdAt,
		}))

		return results
	}



	async calculateScore(attemptId: string, answers: { questionId: string; optionId: string }[]) {
		let score = 0

		for (const answer of answers) {
			const option = await this.prismaService.option.findUnique({
				where: { id: answer.optionId },
			})

			if (option?.isCorrect) {
				score++
			}

			await this.prismaService.attemptOption.create({
				data: {
					attempt: { connect: { id: attemptId } },
					question: { connect: { id: answer.questionId } },
					option: { connect: { id: answer.optionId } },
				},
			})
		}

		return this.prismaService.attempt.update({
			where: { id: attemptId },
			data: { score },
		})
	}

	async getQuizById(quizId: string) {
		const quiz = await this.prismaService.quiz.findFirst({
			where: { id: quizId },
			include: {
				Lesson: true
			}
		})
		if (!quiz) {
			throw new NotFoundException(`Quiz with ID ${quizId} not found`)
		}

		return quiz
	}

	async getMyQuizzes(accessToken: string) {
		const teacherId = await this.getTeacherIdByAccessToken(accessToken)

		const quizzes = await this.prismaService.quiz.findMany({
			where: { teacherId },
		})

		if (!quizzes.length) {
			throw new NotFoundException('No quizzes found for the provided teacher')
		}

		return quizzes
	}

	async removeQuiz(accessToken: string, quizId: string) {
		const teacherId = await this.getTeacherIdByAccessToken(accessToken)

		const quiz = await this.prismaService.quiz.findUnique({
			where: { id: quizId },
		})

		if (!quiz) {
			throw new NotFoundException('Quiz not found')
		}

		if (quiz.teacherId !== teacherId) {
			throw new UnauthorizedException('You are not authorized to delete this quiz')
		}

		await this.prismaService.attemptOption.deleteMany({
			where: {
				attempt: {
					quizId,
				},
			},
		})

		await this.prismaService.attempt.deleteMany({
			where: { quizId },
		})

		await this.prismaService.quiz.delete({
			where: { id: quizId },
		})

		return { message: 'Quiz removed successfully' }
	}



	async createQuiz(accessToken: string, title: string, description: string) {
		const teacherId = await this.getTeacherIdByAccessToken(accessToken)

		const newQuiz = await this.prismaService.quiz.create({
			data: {
				teacherId,
				title,
				description,
			},
		})

		await this.prismaService.lesson.create({
			data: {
				title: newQuiz.title,
				description: `Бұл ${newQuiz.title} куизінің автоматты құрылған сабағы, оны кез келген уақытта өзгертуге болады.`,
				quizId: newQuiz.id,
			},
		})


		return {
			message: 'Quiz created successfully',
			quizId: newQuiz.id
		}
	}

	async updateQuiz(accessToken: string, quizId: string, title: string, description: string) {
		const teacherId = await this.getTeacherIdByAccessToken(accessToken)
		const quiz = await this.prismaService.quiz.findUnique({ where: { id: quizId } })
		if (!quiz) {
			throw new NotFoundException('Quiz not found')
		}
		if (quiz.teacherId !== teacherId) {
			throw new UnauthorizedException('You are not authorized to update this quiz')
		}
		await this.prismaService.quiz.update({
			where: { id: quizId },
			data: { title, description }
		})
		return { message: 'Quiz updated successfully' }
	}

	private async getTeacherIdByAccessToken(
		accessToken: string
	) {
		const user = await this.prismaService.user.findFirst({ where: { token: accessToken } })

		if (!user) {
			throw new UnauthorizedException('User not found with the provided access token')
		}
		if (user.role !== 'TEACHER') {
			throw new UnauthorizedException('The user role is not authorized to perform this action')
		}

		return user.id
	}
}
