import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class LessonService {
	constructor(private readonly prisma: PrismaService) { }

	async edit(id: string, title: string, description: string) {
		await this.prisma.lesson.update({
			where: { id },
			data: { title, description },
		})
	}
}
