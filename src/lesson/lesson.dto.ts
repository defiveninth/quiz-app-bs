import { IsString } from 'class-validator'

export class EditLessonDto {
	@IsString()
	id: string

	@IsString()
	title: string

	@IsString()
	description: string
}