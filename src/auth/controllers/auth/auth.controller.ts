import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { SignInDto } from 'src/auth/dto/SignInDto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('token/:token')
  async refreshToken(@Param('token') refreshToken: string) {
    return refreshToken;
  }

  @Post('signout')
  async signOut(@GetUser('id') userId: string) {
    await this.authService.signOut(userId);

    throw new HttpException('Oturum başarıyla sonlandırıldı', 200);
  }
}
