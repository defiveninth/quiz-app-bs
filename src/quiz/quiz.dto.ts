import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'

export class CreateQuizDto {
	@IsString()
	accessToken: string

	@IsString()
	title: string

	@IsOptional()
	@IsString()
	description?: string
}

export class GetMyQuizzesDto {
	@IsString()
	accessToken: string
}

export class removeQuiz {
	@IsString()
	accessToken: string

	@IsString()
	quizId: string
}

export class UpdateQuizDto {
	@IsString()
	accessToken: string

	@IsString()
	title: string

	@IsOptional()
	@IsString()
	description?: string
}

export class CreateAttemptDto {
	@IsString()
	@IsNotEmpty()
	studentId: string

	@IsString()
	@IsNotEmpty()
	quizId: string

	@IsArray()
	@IsNotEmpty()
	answers: { questionId: string; optionId: string }[]
}

export class SubmitQuizDto {
	@IsString()
	attemptId: string

	answers: any
}

export class getResultsSingleQuizDto {
	@IsString()
	quizId: string
}