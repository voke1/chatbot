import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../services/JWT/jwt.service';
import { LoginUserDto } from '../client/dto/login-user.dto';
import { ClientsService } from '../client/client.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientsService,
    private responseService: ResponseService,
  ) { }
  async validateUserPassword(suppliedDetails: LoginUserDto, req, res) {
    if (suppliedDetails.email === '' || suppliedDetails.password === '') {
      return this.responseService.clientError(
        res,
        'One or more fields is empty',
      );
    }
    const user = await this.clientService.findOneByEmail(suppliedDetails.email);

    if (user) {
      // if (!user.isVerified) {
      //   return this.responseService.clientError(
      //     res,
      //     'You had started the registration process already. ' +
      //       'Please check your email to complete your registration.',
      //   );
      // }
      const isMatch = await bcrypt.compare(
        suppliedDetails.password,
        user.password,
      );
      if (isMatch && !user.isEnabled) {
        return await this.responseService.clientError(res, "You are currently disabled, please contact Administrator")
      }
      const userIsValid = await this.verifyUser(isMatch, user, res);
     

      if (userIsValid) {
        return userIsValid;
      } else {
        return this.responseService.clientError(res, 'Invalid credentials');

      }
    }
    else if (!user) {
      return this.responseService.clientError(res, 'Invalid credentials');
    }
  }

  async verifyUserEmail(token, req, res) {
    const userPayLoad = await TokenService.checkToken(token);
    console.log(userPayLoad);
    const verifiedUser = this.clientService.verifyEmail(
      userPayLoad['email'],
      req,
      res,
    );
    if (verifiedUser && userPayLoad['success']) {
      return await this.verifyUser(true, userPayLoad, res);
    }
    return await this.responseService.clientError(
      res,
      'Could not validate user',
    );
  }
  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.clientService.findOneByEmail(payload.email);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }
  async createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
    };
    const token = await TokenService.getToken(data);
    return {
      expiresIn: 3600,
      token,
    };
  }

  async verifyUser(isMatch, user, res) {
    if (isMatch) {
      const tokenCreated = await TokenService.getToken({
        id: user.id,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        email: user.email,

      });
      if (tokenCreated) {
        const userDetails = {
          id: user.id,
          fullName: user.fullName,
          token: tokenCreated,
          role: user.role,
          companyId: user.companyId
        };
        return this.responseService.requestSuccessful(
          res,
          {
            success: true,
            message: 'Login successful...',
            userDetails,
          },
          200,
        );
      }
    }

    return false;
  }
}
