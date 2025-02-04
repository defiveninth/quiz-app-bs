import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { MailService } from 'src/mailer/mailer.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { env } from 'process'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey123',
    }),
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
  controllers: [AuthController],
  providers: [AuthService, PrismaService, MailService],
})
export class AuthModule { }
