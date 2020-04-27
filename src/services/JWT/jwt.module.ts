import { Module } from '@nestjs/common';
import { TokenService } from '../JWT/jwt.service';

@Module({
  imports: [],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
