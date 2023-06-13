import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { Post as PostItem } from '@prisma/client';

@Controller('posts')
export class PostController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Req() request: any) {
    const userId = request.user.id;

    return this.prisma.post.create({
      data: { ...createPostDto, authorId: userId },
    });
  }

  @Get()
  async findAll(): Promise<PostItem[]> {
    return this.prisma.post.findMany();
  }

  @Post(':postId/comments')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Body() createPostCommentDto: { postId: number; content: string },
    @Req() request: any,
  ) {
    return this.prisma.postComment.create({
      data: { ...createPostCommentDto, authorId: request.user.id },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }
}
