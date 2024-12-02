import { Module } from '@nestjs/common'
import { AttemptService } from './attempt.service'
import { AttemptController } from './attempt.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [AttemptController],
  providers: [AttemptService, PrismaService],
})
export class AttemptModule { }
