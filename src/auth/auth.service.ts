import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Role } from './user.dto'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { JwtService } from '@nestjs/jwt'
import { compare, genSalt, hash } from 'bcryptjs'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private jwtService: JwtService,
		private readonly mailerService: MailerService
	) { }

	async getInfo(accessToken: string) {
		const user = await this.prisma.user.findFirst({
			where: { token: accessToken }
		})

		if (!user) {
			throw new HttpException('User not found with the provided access token', HttpStatus.NOT_FOUND)
		}

		return {
			id: user.id,
			email: user.email,
			role: user.role as Role,
			firstname: user.firstName,
			surname: user.surname
		}
	}

	async signIn(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } })
		if (!user) {
			throw new HttpException('Error: User not found.', HttpStatus.NOT_FOUND)
		}
		const isPasswordValid = await compare(password, user.password)
		if (!isPasswordValid) {
			throw new HttpException('Error: Invalid password.', HttpStatus.UNAUTHORIZED)
		}
		const payload = this.generatePayload(user.id, email, user.role as Role)
		const accessToken = this.generateAccessToken(payload)
		await this.prisma.user.update({
			where: { email },
			data: {
				token: accessToken,
			},
		})
		return {
			message: 'user sign in successfully',
			accessToken,
			role: user.role as Role
		}
	}

	async verifyAccount(verifyToken: string, newPassword: string, firstName: string, surname: string) {
		try {
			const user = await this.prisma.user.findFirstOrThrow({
				where: { verifyToken },
			})

			const hashedPassword = await this.hashPassword(newPassword)

			const payload = this.generatePayload(user.id, user.email, user.role as Role)
			const accessToken = this.generateAccessToken(payload)

			await this.prisma.user.update({
				where: { email: user.email },
				data: {
					password: hashedPassword,
					verifyToken: null,
					token: accessToken,
					firstName,
					surname
				},
			})

			return {
				message: 'User verified successfully.',
				accessToken,
				role: user.role as Role,
			}
		} catch (error) {
			if (error.code === 'P2025') {
				throw new HttpException(
					'Error: Invalid verification token.',
					HttpStatus.UNAUTHORIZED,
				)
			}

			throw new HttpException(
				'Error: Something went wrong. Please try again.',
				HttpStatus.INTERNAL_SERVER_ERROR,
			)
		}
	}

	async verifyToken(verifyToken: string) {
		try {
			await this.prisma.user.findFirstOrThrow({
				where: { verifyToken },
			})

			return 'success'
		} catch (error) {
			if (error.code === 'P2025') {
				throw new HttpException(
					'Error: User with this token not found',
					HttpStatus.NOT_FOUND,
				)
			}

			throw new HttpException(
				'Error: Something went wrong. Please try again.',
				HttpStatus.INTERNAL_SERVER_ERROR,
			)
		}
	}


	async createUser(email: string, role: Role) {
		try {
			const verifyToken = this.generateVerifyToken()
			const verifyEmail = 'https://myapi.kz/auth/activate/' + verifyToken

			await this.prisma.user.create({
				data: {
					email,
					role,
					verifyToken,
				},
			})

			await this.sendEmail(email, verifyEmail)

			return {
				message: 'Пайдаланушы сәтті жасалды, тіркелгіңізді белсендіру үшін электрондық пошта мекенжайыңызды тексеріңіз',
			}
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new HttpException(
						'Error: User with this email already exists.',
						HttpStatus.CONFLICT,
					)
				}
			}
			return { message: 'Error: Something went wrong. Please try again.' }
		}
	}

	async sendEmail(to: string, link: string) {
		const htmlContent = `
      <h1>Quiz-app: Біздің сервиске қош келдіңіз!</h1>
      <p>Аккаунтты активация жасау сілтемесі</p>
      <p><a href="${link}">${link}</a></p>
    `
		try {
			await this.mailerService.sendMail({
				to,
				subject: 'Quiz-app: Біздің сервиске қош келдіңіз',
				html: htmlContent,
				from: 'abdurrauf.sakenov@narxoz.kz',
			})
			console.log('Email sent successfully')
		} catch (error) {
			console.error('Error sending email:', error)
			throw error
		}
	}

	private generateVerifyToken() {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let result = ''
		const length = 50

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length)
			result += characters[randomIndex]
		}

		return result
	}

	private generatePayload(sub: string, email: string, role: Role): Record<string, any> {
		return {
			sub,
			email,
			role
		}
	}

	private generateAccessToken(payload: Record<string, any>) {
		const accessToken = this.jwtService.sign(payload, { expiresIn: '30d' })
		return accessToken
	}

	private async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
		return await compare(inputPassword, hashedPassword)
	}

	private async hashPassword(password: string): Promise<string> {
		const salt = await genSalt(10)
		return hash(password, salt)
	}
}
