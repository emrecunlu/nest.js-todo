import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/auth/dto/SignInDto';
import { JwtPayload } from 'src/auth/types/JwtPayload';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { UserService } from 'src/user/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateToken(payload: JwtPayload, expiresIn: string) {
    return this.jwtService.sign(payload, { expiresIn });
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.get({ userName: signInDto.userName });

    if (!user)
      throw new BadRequestException('Kullanıcı adı veya şifre hatalı!');

    const matched = await bcrypt.compare(signInDto.password, user.password);

    if (!matched)
      throw new BadRequestException('Kullanıcı adı veya şifre hatalı!');

    const payload: JwtPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      userName: user.userName,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };

    const [accessToken, refreshToken] = [
      this.generateToken(
        payload,
        this.configService.get<string>('JWT_EXPIRES'),
      ),
      this.generateToken(
        payload,
        this.configService.get<string>('JWT_REFRESH_EXPIRES'),
      ),
    ];

    await this.userService.update(user.id, { refreshToken });

    return { accessToken, refreshToken };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.get({
      userName: createUserDto.userName,
    });

    if (user) {
      throw new BadRequestException('Zaten böyle bir kullanıcı kayıtlı!');
    }

    return await this.userService.create(createUserDto);
  }

  async signOut(userId: string) {
    return await this.userService.update(userId, { refreshToken: null });
  }
}
