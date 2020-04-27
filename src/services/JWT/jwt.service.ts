import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

export class TokenService {
  constructor(private jwtService: JwtService) {}

  /**
   * scrambles string data
   * @param {String} token - input string data
   * @returns {String} - scrambled data
   */
  static async shuffleToken(token) {
    return token
      .split('')
      .reverse()
      .join('');
  }
  /**
   * creates a user token
   * @param {object} payload - contains id, role username and hashedPassword
   * @param {integer} expiresIn - Time in seconds
   * @returns {string} - returns a jwt token
   */
  static async getToken(payload, expiresIn = '24h') {
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn,
    });
    const scrambledToken = this.shuffleToken(token);
    return scrambledToken;
  }

  static async verifyToken(token) {
    const reshuffledToken = await TokenService.shuffleToken(token);
    let output = {};
    try {
      return jwt.verify(
        reshuffledToken,
        process.env.SECRET_KEY,
        (err, decoded) => {
          if (err) {
            output = {
              Error: 'Failed to authenticate token',
              success: false,
            };
          } else {
            output = {
              success: true,
              id: decoded.id,
              email: decoded.email,
              fullName: decoded.fullName,
            };
          }
          return output;
        },
      );
    } catch (e) {
      throw e;
    }
  }
  static async checkToken(token) {
    return await TokenService.verifyToken(token);
  }
}
