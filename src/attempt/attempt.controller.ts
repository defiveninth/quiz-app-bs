import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateAttemptDto, getMyAttemptsDto } from './attempt.dto'
import { AttemptService } from './attempt.service'

@Controller('attempt')
export class AttemptController {
  constructor(private readonly attemptService: AttemptService) { }

  @Get(':id')
  @UsePipes(ValidationPipe)
  async getAttempt(@Param('id') id: string) {
    return this.attemptService.getAttempt(id)
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createAttempt(@Body() body: CreateAttemptDto) {
    const { accessToken, quizId } = body
    return this.attemptService.createAttempt(accessToken, quizId)
  }

  @Post('get-mine')
  @UsePipes(ValidationPipe)
  async getMyAttempts(@Body() body: getMyAttemptsDto) {
    const { accessToken } = body
    return this.attemptService.getMyAttempts(accessToken)
  }
}