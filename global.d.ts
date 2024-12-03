import { Multer } from 'multer'

declare global {
	namespace Express {
		export interface MulterFile {
			fieldname: string
			originalname: string
			encoding: string
			mimetype: string
			size: number
			destination: string
			filename: string
			path: string
			buffer: Buffer
		}

		export interface Request {
			file?: MulterFile
			files?: MulterFile[]
		}
	}
}
