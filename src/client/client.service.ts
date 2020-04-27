import { Injectable } from '@nestjs/common';
import { Client } from './interfaces/client.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmailService } from '../services/Email/email.service';
import { TokenService } from '../services/JWT/jwt.service';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Client') private clientModel: Model<Client>,
    private emailService: EmailService,
    private responseService: ResponseService,
  ) { }
  async createTokenAndSendEmail(userExist) {
    const tokenCreated = await TokenService.getToken(
      {
        email: userExist.email,
        id: userExist.id,
        fullName: userExist.fullName,
        role: userExist.role,
        isRegistered: userExist.isRegistered,
      },
      '1h',
    );
    if (tokenCreated) {
      const isEmailSent = await this.emailService.verifyEmail(
        userExist.email,
        userExist.fullName,
        tokenCreated,
      );
      return isEmailSent;
    }
  }
  async validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find({}, { password: 0 });
  }

  async findOne(id: string): Promise<Client> {
    return await this.clientModel.findOne({ _id: id });
  }
  async findAllByClient(clientId: string): Promise<Client> {
    return await this.clientModel.find({ clientId});
  }
  async create(client: Client) {
    const newClient = new this.clientModel(client);
    const errorResult = {
      message: `A User with ${client.email} already exist`,
    };
    const result = await this.clientModel.findOne({ email: client.email });

    if (result) {
      return errorResult;
    }
    return await newClient.save();
  }

  async delete(id: string): Promise<Client> {
    return await this.clientModel.findByIdAndRemove(id);
  }

  async update(id: string, client: Client, companyId): Promise<Client> {
    if(companyId){
console.log("i am called", companyId)
      return await this.clientModel.findByIdAndUpdate({_id: id}, {companyId: companyId}, {new: true});

    }
    return await this.clientModel.findByIdAndUpdate(id, client, { new: true });
  }

  // async findAndUpdate(id: string): Promise<Client> {
  //   return await this.clientModel.findByIdAndUpdate();
  // }

  async findOneByEmail(email): Promise<Client> {
    return await this.clientModel.findOne({ email });
  }
  async verifyEmail(email, req, res): Promise<any> {
    const foundUser = await this.clientModel.findOne({ email });
    if (foundUser && foundUser.isVerified) {
      res.redirect(`${this.BASE_URL}/dashboard/admin`);
      return await this.responseService.requestSuccessful(res, {
        success: true,
        message: 'User is already verified',
      });
    }
    if (foundUser) {
      const verifiedUser = await this.clientModel.updateOne(
        { email },
        { $set: { isVerified: true } },
      );
      if (verifiedUser) {
        const isEmailSent = this.emailService.confirmRegistrationComplete(
          email,
        );
        if (isEmailSent) {
          const tokenCreated = await TokenService.getToken({
            email,
            fullName: foundUser.fullName,
            id: foundUser.id,
          });
          res.redirect(`${this.BASE_URL}/dashboard/admin`);
          return this.responseService.requestSuccessful(res, {
            success: true,
            message: `User ${foundUser.fullName} created successfully`,
            id: foundUser.id,
            fullName: foundUser.fullName,
            token: tokenCreated,
          });
        }
      }
    }
    return false;
  }
  async signUp(client: Client, req, res): Promise<Client> {
    console.log('called signup');
    console.log('Reqeust:', req.body)
    if (!(await this.validateEmail(client.email))) {
      return this.responseService.clientError(
        res,
        'please enter a valid email',
      );
    }
    const userExist = await this.clientModel.findOne({ email: client.email });
    
    try {
      if (userExist) {
        if (!userExist.isVerified) {
          const isEmailSent = await this.createTokenAndSendEmail(userExist);
          if (isEmailSent) {
            return this.responseService.clientError(
              res,
              'You had started the registration process earlier. ' +
              'An email has been sent to your email address. ' +
              'Please check your email to complete your registration.',
            );
          }
          return this.responseService.clientError(
            res,
            'Your registration could not be completed. Please try again',
          );
        }
        return this.responseService.clientError(
          res,
          'You are a registered user on this platform. Please proceed to login',
        );
      }
      if (req.body.isChecked) {
        return this.responseService.requestSuccessful(res, "client successfully screened")
      }
      client.password = await bcrypt.hash(client.password, 6);
      console.log("password", client)
      const user = new this.clientModel(req.body);
      const userCreated = await user.save();
      console.log("created", userCreated)
      if (req.body.isCreated) {
        return this.responseService.requestSuccessful(res, user)
      }
      const isEmailSent = await this.createTokenAndSendEmail(userCreated);
      if (isEmailSent) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message:
            'An email has been sent to your ' +
            'email address. Please check your email to complete your registration',
        });
      }
      return this.responseService.clientError(
        res,
        'Your registration could not be completed. Please try again',
      );
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }

  async findByIdAndToggleEnable(id: string): Promise<Client> {
    return await this.clientModel.findOne({ _id: id }, (err, clientModel) => {
      clientModel.isEnabled = !clientModel.isEnabled;
      clientModel.save((err, updatedClient) => {
        return updatedClient;
      });
    });
  }
}

// async findOne(id: string): Promise<Client> {
//   return await this.clientModel.findOne({ _id: id });
// }
//
// async create(client: Client): Promise<Client> {
//   const newClient = new this.clientModel(client);
//   return await newClient.save();
// }
//
// async delete(id: string): Promise<Client> {
//   return await this.clientModel.findByIdAndRemove(id);
// }
//
// async update(id: string, client: Client): Promise<Client> {
//   return await this.clientModel.findByIdAndUpdate(id, client, { new: true });
// }

// }
