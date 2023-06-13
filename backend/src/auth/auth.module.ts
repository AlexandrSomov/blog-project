import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";

const moduleConfig = JwtModule.register({
  secret: 'qwetgds', // Replace with your own secret key
  signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
});

@Module({
  imports: [moduleConfig, PrismaModule],
  exports: [moduleConfig, AuthService, JwtAuthGuard],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
