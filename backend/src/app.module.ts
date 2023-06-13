import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { PostModule } from "./post/post.module";

@Module({
  imports: [
    UserModule,
    PostModule,
    JwtModule.register({
      secret: 'qwetgds', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
})
export class AppModule {}
