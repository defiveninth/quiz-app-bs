import {
  Controller,
  Post,
  UploadedFile,
  Body,
  ValidationPipe,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  NotFoundException,
  Res,
  UsePipes,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { LessonService } from './lesson.service'
import { EditLessonDto } from './lesson.dto'
import { File } from 'multer'
import * as path from 'path'
import { promises as fs } from 'fs'

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Post('edit')
  @UsePipes(ValidationPipe)
  async editLesson(@Body() body: EditLessonDto) {
    const { id, description, title } = body
    return this.lessonService.edit(id, title, description)
  }

  @Post('add-file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`
          cb(null, uniqueName)
        },
      }),
    }),
  )
  async addFileToLesson(
    @Body(ValidationPipe) body: { lessonId: string },
    @UploadedFile() file: File,
  ) {
    const { lessonId } = body

    if (!file) {
      throw new BadRequestException('No file uploaded!')
    }

    if (!lessonId) {
      throw new BadRequestException('Lesson ID is required!')
    }

    const allowedMimeTypes = [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ]

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only PowerPoint files are allowed.')
    }

    const allowedExtensions = ['.ppt', '.pptx']
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase()

    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      throw new BadRequestException('Invalid file extension. Only .ppt or .pptx files are allowed.')
    }

    const filePath = file.path
    await this.lessonService.addFileToLesson(lessonId, filePath)

    const fileUrl = `/lesson-files/${lessonId}/${file.filename}`
    return { message: 'File uploaded successfully', fileUrl }
  }

  @Get(':lessonId/files')
  async getFilesByLessonId(@Param('lessonId') lessonId: string) {
    try {
      const files = await this.lessonService.getFilesByQuizId(lessonId)
      const filePaths = files.map(file => `/lesson-files/${lessonId}/${path.basename(file)}`)
      return { files: filePaths }
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Get(':lessonId/files/:filename')
  async getFileDownloadPath(
    @Param('lessonId') lessonId: string,
    @Param('filename') filename: string,
  ) {
    const filePath = path.join(__dirname, '..', 'lesson-files', lessonId, filename)

    try {
      await fs.access(filePath)
      return { downloadPath: `/lesson-files/${lessonId}/${filename}` }
    } catch (error) {
      throw new NotFoundException('File not found')
    }
  }
}
