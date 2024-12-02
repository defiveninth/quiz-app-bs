import { Controller, Post, Body, Get, UsePipes, ValidationPipe } from '@nestjs/common'
import { MailService } from './mailer.service'
import { SendEmailDto } from './mailer.pipes'

@Controller('mailer')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Get('test')
  async testSendEmail() {
    return 'hello world'
  }

  @Post('send')
  @UsePipes(ValidationPipe)
  async sendEmail(@Body() body: SendEmailDto) {
    console.log('sendEmail request')
    const { to, subject, link } = body
    await this.mailService.sendEmail(to, link)
    return { message: 'Email sent successfully!' }
  }
}
