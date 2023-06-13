import { Test } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('PostController', () => {
  let postController: PostController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PrismaService],
    }).compile();

    postController = moduleRef.get<PostController>(PostController);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto = { title: 'Test Post', content: 'Test Content' };
      const request = { user: { id: 1 } };

      // @ts-ignore
      jest.spyOn(prismaService.post, 'create').mockResolvedValueOnce({});

      const result = await postController.create(createPostDto, request);

      expect(prismaService.post.create).toHaveBeenCalledWith({
        data: { ...createPostDto, authorId: request.user.id },
      });
      expect(result).toEqual({});
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const posts = [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ];

      // @ts-ignore
      jest.spyOn(prismaService.post, 'findMany').mockResolvedValueOnce(posts);

      const result = await postController.findAll();

      expect(prismaService.post.findMany).toHaveBeenCalled();
      expect(result).toEqual(posts);
    });
  });

  describe('createComment', () => {
    it('should create a new comment for a post', async () => {
      const createPostCommentDto = { postId: 1, content: 'Test Comment' };
      const request = { user: { id: 1 } };

      // @ts-ignore
      jest.spyOn(prismaService.postComment, 'create').mockResolvedValueOnce({});

      const result = await postController.createComment(
        createPostCommentDto,
        request,
      );

      expect(prismaService.postComment.create).toHaveBeenCalledWith({
        data: { ...createPostCommentDto, authorId: request.user.id },
      });
      expect(result).toEqual({});
    });
  });

  describe('findOne', () => {
    it('should return a post with the specified ID', async () => {
      const postId = 1;
      const post = { id: 1, title: 'Test Post' };

      // @ts-ignore
      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValueOnce(post);

      const result = await postController.findOne(postId);

      expect(prismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: Number(postId) },
        include: {
          comments: {
            include: {
              author: true,
            },
          },
        },
      });
      expect(result).toEqual(post);
    });

    it('should throw NotFoundException if post is not found', async () => {
      const postId = 1;

      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValueOnce(null);

      await expect(postController.findOne(postId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(prismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: Number(postId) },
        include: {
          comments: {
            include: {
              author: true,
            },
          },
        },
      });
    });
  });
});
