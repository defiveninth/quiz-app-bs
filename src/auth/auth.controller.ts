import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto, getInfoDto, SignInDto, VerifyAccountDto, VerifyToken } from './user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('get-info')
  @UsePipes(ValidationPipe)
  async getInfo(@Body() body: getInfoDto) {
    const { accessToken } = body
    return this.authService.getInfo(accessToken)
  }

  @Post('sign-in')
  @UsePipes(ValidationPipe)
  async login(@Body() body: SignInDto) {
    const { email, password } = body
    return this.authService.signIn(email, password)
  }

  @Post('create-account')
  @UsePipes(ValidationPipe)
  async create(@Body() body: CreateUserDto) {
    const { email, role } = body
    return this.authService.createUser(email, role)
  }

  @Post('verify-account')
  @UsePipes(ValidationPipe)
  async verifyAccount(@Body() body: VerifyAccountDto) {
    const { verifyToken, newPassword, firstName, surname } = body
    const result = await this.authService.verifyAccount(verifyToken, newPassword, firstName, surname)

    return result
  }

  @Post('verify-token')
  @UsePipes(ValidationPipe)
  async verifyToken(@Body() body: VerifyToken) {
    const { verifyToken } = body
    return this.authService.verifyToken(verifyToken)
  }
}
