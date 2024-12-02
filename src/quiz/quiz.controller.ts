import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { QuizService } from './quiz.service'
import { CreateQuizDto, GetMyQuizzesDto, getResultsSingleQuizDto, removeQuiz, SubmitQuizDto, UpdateQuizDto } from './quiz.dto'

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService
  ) { }

  @Get()
  async getQuiz() {
    return this.quizService.getAll()
  }

  @Get(':id')
  async getSingleQuiz(@Param('id') id: string) {
    return this.quizService.getQuizById(id)
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() body: CreateQuizDto) {
    const { accessToken, title, description } = body
    return await this.quizService.createQuiz(accessToken, title, description)
  }

  @Post('results')
  @UsePipes(ValidationPipe)
  async results(@Body() body: getResultsSingleQuizDto) {
    const { quizId } = body
    const score = await this.quizService.getResultsSingleQuiz(quizId)
    return { score }
  }

  @Post('submit')
  @UsePipes(ValidationPipe)
  async submitQuiz(@Body() submitQuizDto: SubmitQuizDto) {
    const { attemptId, answers } = submitQuizDto
    const score = await this.quizService.calculateScore(attemptId, answers)
    return { score }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateQuiz(
    @Param('id') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto
  ) {
    const { accessToken, title, description } = updateQuizDto
    return this.quizService.updateQuiz(accessToken, quizId, title, description)
  }

  @Delete()
  @UsePipes(ValidationPipe)
  async removeQuiz(@Body() body: removeQuiz) {
    const { accessToken, quizId } = body
    return await this.quizService.removeQuiz(accessToken, quizId)
  }

  @Post('mine')
  @UsePipes(ValidationPipe)
  async getMyQuizzes(@Body() body: GetMyQuizzesDto) {
    const { accessToken } = body
    return await this.quizService.getMyQuizzes(accessToken)
  }
}
