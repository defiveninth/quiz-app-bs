import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AttemptService {
	constructor(
		private readonly prisma: PrismaService
	) { }

	async getAttempt(id: string) {
		const attempt = await this.prisma.attempt.findFirst({
			where: {
				id
			},
			include: {
				quiz: {
					include: {
						questions: {
							include: {
								options: true
							}
						}
					}
				}
			}
		})

		if (!attempt) {
			throw new NotFoundException('Attempt with this ID does not exist')
		}

		return attempt
	}


	async createAttempt(accessToken: string, quizId: string) {
		const studentId = await this.getStudentIdByAccessToken(accessToken)
		return this.prisma.attempt.create({
			data: {
				student: { connect: { id: studentId } },
				quiz: { connect: { id: quizId } },
			},
		})
	}

	async submitAttempt(attemptId: string, answers: { questionId: string; optionId: string }[]) {
		let score = 0

		for (const answer of answers) {
			const option = await this.prisma.option.findUnique({
				where: { id: answer.optionId },
			})

			if (!option) {
				throw new NotFoundException(`Option with ID ${answer.optionId} does not exist`)
			}

			console.log(`Question ID: ${answer.questionId}, Option ID: ${answer.optionId}, Is Correct: ${option.isCorrect}`)

			if (option.isCorrect) {
				score++
			}

			await this.prisma.attemptOption.create({
				data: {
					attempt: { connect: { id: attemptId } },
					question: { connect: { id: answer.questionId } },
					option: { connect: { id: answer.optionId } },
				},
			})
		}

		const updatedAttempt = await this.prisma.attempt.update({
			where: { id: attemptId },
			data: { score },
		})

		console.log(`Attempt ID: ${attemptId}, Final Score: ${score}`)
		return updatedAttempt
	}

	async getMyAttempts(accessToken: string) {
		const studentId = await this.getStudentIdByAccessToken(accessToken)
		return this.prisma.attempt.findMany({
			where: { studentId },
			include: {
				quiz: {
					include: {
						questions: true
					}
				}
			}
		})
	}

	private async getStudentIdByAccessToken(
		accessToken: string
	) {
		const user = await this.prisma.user.findFirst({ where: { token: accessToken } })

		if (!user) {
			throw new UnauthorizedException('User not found with the provided access token')
		}
		if (user.role !== 'STUDENT') {
			throw new UnauthorizedException('The user role is not authorized to perform this action')
		}

		return user.id
	}
}
