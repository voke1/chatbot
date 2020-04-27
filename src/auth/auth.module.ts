import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule } from '../client/client.module';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from '../services/JWT/jwt.service';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  imports: [
    ClientsModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [AuthController],
  providers: [TokenService, AuthService, JwtStrategy, ResponseService],
})
export class AuthModule { }
