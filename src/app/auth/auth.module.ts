import { AuthController } from '@app/auth/controller/auth.controller';
import { AuthService } from '@app/auth/service/auth.service';
import { JwtStrategy } from '@app/auth/strategy/jwt.strategy';
import { UsersModule } from '@app/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('app.auth.jwtSecretKey'),
        signOptions: { expiresIn: configService.get('app.auth.jwtExpiration') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
