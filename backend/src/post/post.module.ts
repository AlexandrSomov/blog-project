import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
})
export class PostModule {}
