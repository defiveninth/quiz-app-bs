import { IsEmail, IsString } from 'class-validator'

export class SendEmailDto {
	@IsString()
	@IsEmail()
	to: string

	@IsString()
	subject: string

	@IsString()
    link: string
}