import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { EditLessonDto } from './lesson.dto'

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Post('edit')
  @UsePipes(ValidationPipe)
  async editLesson(@Body() body: EditLessonDto) {
    const { id, description, title } = body
    return this.lessonService.edit(id, title, description)
  }
}
