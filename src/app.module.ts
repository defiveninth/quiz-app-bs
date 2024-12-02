import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { AttemptModule } from './attempt/attempt.module';
import { LessonModule } from './lesson/lesson.module';
import { MailModule } from './mailer/mailer.module'

@Module({
  imports: [PrismaModule, AuthModule, QuizModule, QuestionModule, AttemptModule, LessonModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
