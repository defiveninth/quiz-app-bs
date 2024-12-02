import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { MailController } from './mailer.controller'
import { MailService } from './mailer.service'
import { env } from 'process'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.SMTP_API_SERVER,
        port: env.SMTP_API_PORT,
        secure: false,
        auth: {
          user: env.SMTP_API_USERNAME,
          pass: env.SMTP_API_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
      template: {
        dir: __dirname + '/../mailer/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule { }
