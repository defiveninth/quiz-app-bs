import { IsEmail, IsEnum, IsString, Length, MinLength } from 'class-validator'

export enum Role {
	TEACHER = 'TEACHER',
	STUDENT = 'STUDENT',
}

export class CreateUserDto {
	@IsEmail()
	email: string

	@IsEnum(Role)
	role: Role
}

export class VerifyAccountDto {
	@IsString()
	verifyToken: string

	@IsString()
	@MinLength(8)
	newPassword: string

	@IsString()
	firstName: string

	@IsString()
	surname: string
}

export class SignInDto {
	@IsEmail()
	email: string

	@IsString()
	@MinLength(8)
	password: string
}

export class VerifyToken {
	@IsString()
	verifyToken: string
}

export class getInfoDto {
	@IsString()
	accessToken: string
}