import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostCommentDto } from '../post/dto/create-post-comment.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto });

    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.authService.generateToken(user);
    return { token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(
    @Body() createPostCommentDto: CreatePostCommentDto,
    @Req() request: any,
  ) {
    return this.prisma.user.findUnique({
      where: {
        id: request.user.id,
      },
    });
  }
}
