import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let prismaService: PrismaService;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [PrismaService, AuthService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const createUserDto: { password: string; email: string } = {
        email: 'test@example.com',
        password: 'test123',
      };

      const createdUser = { id: 1, email: 'test@example.com' };

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValueOnce(createdUser as any);

      const result = await userController.register(createUserDto);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto,
      });
      expect(result).toEqual({
        message: 'User registered successfully',
        user: createdUser,
      });
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'test123',
      };

      const user = { id: 1, email: 'test@example.com' };
      const token = 'test_token';

      jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValueOnce(user as any);
      jest.spyOn(authService, 'generateToken').mockResolvedValueOnce(token);

      const result = await userController.login(loginDto);

      expect(authService.validateUser).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      expect(authService.generateToken).toHaveBeenCalledWith(user);
      expect(result).toEqual({ token });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'test123',
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(null);

      await expect(userController.login(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
      expect(authService.validateUser).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });
  });

  describe('me', () => {
    it('should return the current user', async () => {
      const request = { user: { id: 1 } };

      const user = { id: 1, email: 'test@example.com' };

      // @ts-ignore
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(user);

      const result = await userController.me(null, request);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: request.user.id,
        },
      });
      expect(result).toEqual(user);
    });
  });
});
