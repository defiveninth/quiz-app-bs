import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { MailService } from 'src/mailer/mailer.service'

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey123',
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, MailService],
})
export class AuthModule { }
