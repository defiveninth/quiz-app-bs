import { Injectable, NotFoundException } from '@nestjs/common'
import path from 'path'
import { PrismaService } from 'src/prisma/prisma.service'
import { promises as fs } from 'fs'
import { randomBytes } from 'crypto'

@Injectable()
export class LessonService {
	constructor(
		private readonly prisma: PrismaService,
	) { }

	async edit(id: string, title: string, description: string, ytVideoUrl: string) {
		await this.prisma.lesson.update({
			where: { id },
			data: { title, description, ytVideoUrl },
		})
	}

	async addFileToLesson(lessonId: string, filePath: string): Promise<any> {
		try {
			const fileExtension = path.extname(filePath).toLowerCase()
			const validExtensions = ['.ppt', '.pptx']

			if (!validExtensions.includes(fileExtension)) {
				throw new Error('Invalid file type')
			}

			const destinationFolder = path.join(__dirname, '..', 'lesson-files', lessonId)
			await fs.mkdir(destinationFolder, { recursive: true }) // Create lesson folder if it doesn't exist

			const randomString = randomBytes(3).toString('hex')
			const newFileName = `${lessonId}-${randomString}${fileExtension}`
			const newFilePath = path.join(destinationFolder, newFileName)

			await fs.rename(filePath, newFilePath)

			return { message: 'File saved successfully', filePath: newFilePath }
		} catch (error) {
			throw new Error(`Error saving file: ${error.message}`)
		}
	}

	async getFilesByQuizId(quizId: string): Promise<string[]> {
		const quizFolderPath = path.join(__dirname, '..', 'lesson-files', quizId) // Assuming quizId corresponds to a folder under 'lesson-files'

		try {
			const folderExists = await fs.stat(quizFolderPath).catch(() => false)
			if (!folderExists) {
				throw new NotFoundException('No files associated with this quiz ID')
			}

			const files = await fs.readdir(quizFolderPath)
			const quizFiles = files
				.map((file) => path.join(quizFolderPath, file))

			if (quizFiles.length === 0) {
				throw new NotFoundException('No files found for this quiz ID')
			}

			return quizFiles
		} catch (error) {
			throw new NotFoundException('Error retrieving quiz files: ' + error.message)
		}
	}
}
