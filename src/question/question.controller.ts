import { Body, Controller, Get, Param, Post, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto'
import { QuestionsService } from './question.service'

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    const question = await this.questionService.createQuestion(createQuestionDto)
    return {
      data: question,
      message: 'Question created successfully',
    }
  }

  @Get()
  async getAllQuestions() {
    const questions = await this.questionService.getAllQuestions()
    return {
      data: questions,
      message: 'Questions retrieved successfully',
    }
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    const question = await this.questionService.getQuestionById(id)
    return {
      data: question,
      message: 'Question retrieved successfully',
    }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateQuestion(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    const updatedQuestion = await this.questionService.updateQuestion(id, updateQuestionDto)
    return {
      data: updatedQuestion,
      message: 'Question updated successfully',
    }
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    await this.questionService.deleteQuestion(id)
    return {
      message: 'Question deleted successfully',
    }
  }
}
