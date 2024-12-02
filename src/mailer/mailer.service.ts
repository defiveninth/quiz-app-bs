import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) { }

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
}
