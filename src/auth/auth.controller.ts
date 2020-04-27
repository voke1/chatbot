import { Controller, Post, Body, Req, Res, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../client/dto/login-user.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/verify_email')
  async verifyEmail(
    @Query('token') token,
    @Req() req: Response,
    @Res() res: Response,
  ) {
    const authenticatedUser = await this.authService.verifyUserEmail(
      token,
      req,
      res,
    );
    if (authenticatedUser) {
      return authenticatedUser;
    }
    return {};
  }

  @Post()
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Response,
    @Res() res: Response,
  ) {
    return await this.authService.validateUserPassword(loginUserDto, req, res);
  }
}
