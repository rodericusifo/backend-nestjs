import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@shared/strategy/jwt.strategy';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy],
})
export class StrategyModule {}
