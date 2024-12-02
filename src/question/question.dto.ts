import { IsString, IsBoolean, IsArray, ValidateNested, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateOptionDto {
	@IsString()
	text: string

	@IsBoolean()
	isCorrect: boolean
}

export class CreateQuestionDto {
	@IsString()
	text: string

	@IsString()
	quizId: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOptionDto)
	options: CreateOptionDto[]
}

export class UpdateOptionDto {
	@IsString()
	text: string

	@IsBoolean()
	isCorrect: boolean

	@IsOptional()
	@IsString()
	id?: string
}

export class UpdateQuestionDto {
	@IsString()
	text: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateOptionDto)
	options: UpdateOptionDto[]
}
