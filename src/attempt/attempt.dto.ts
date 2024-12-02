import { IsString } from 'class-validator'

export class CreateAttemptDto {
	@IsString()
	accessToken: string

	@IsString()
	quizId: string
}

export class getMyAttemptsDto {
	@IsString()
	accessToken: string
}