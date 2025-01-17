import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
let baseUrl = '';

if (process.env.NODE_ENV !== 'production') {
  baseUrl = process.env.SENDGRID_DEVELOPMENT__URL;
} else {
  baseUrl = process.env.SENDGRID_PRODUCTION__URL;
}

console.log(baseUrl);
/* eslint-disable max-len */
/**
 * @description contains utility function to send emails
 */
@Injectable()
export class EmailService {
  constructor(private sendGrid: SendGridService) { }
  /**
   * @param {string} email - email address to send the message to
   * @param {string} firstName - User's first name
   * @param {string} token - Token generated during signup
   * @returns {boolean} specifies if the email was sent successfully
   */

  async verifyEmail(email, firstName, token, ) {
    const details = {
      email,
      subject: 'Email Verification - Chatta',
      html: `'<div style="width: 90%; margin: 5em auto;
       box-shadow: 0 0 10px rgba(0,0,0,.9);">
        <div>
          <div>
            <div style="background-color: #2084ba; height: 3rem; width: 100%">
                <h2 style="text-align: center; color: white;
                 padding-top: 10px;">Chatta</h2>
            </div>
            <h4 style="text-align: center">Hi! ${firstName}</h4>
          </div>
          <div style=" padding: 0px 20px 20px 20px">
            <div style="text-align: center">
              <p>Please verify that your email is <strong>${email}</strong>
               when you signed up.</p>
              <p>Click on the button below to verify.</p>
              
                <a  href="http://localhost:3000/auth/verify_email?token=${token}"
                 style="text-decoration: none; background-color: #2084ba; color: white; padding: 1em 1.5em; text-decoration: none;text-transform: uppercase;
                 ">Verify Account</a>
            </div>
            <div>
              <h3 style="text-align: center">Thank you</h3>
              <h3 style="text-align: center">
              Please do not reply, this is an autogenerated email.</h3>
            </div>
          </div>
        </div>
      </div>`,
    };
    return this.emailSender(details);
  }

  /**
   * @param {string} notificationDetails - An object
   * containing details required to send notifications
   * @returns {boolean} specifies if the email was sent successfully
   */

  /**
   * This function sends an email on verification of email address
   * @param {string} email - email address to send the message to
   * @param {string} token - Token generated during signup
   * @returns {boolean} specifies if a verification email was sent to user
   * after registration
   */
  async confirmRegistrationComplete(email) {
    const details = {
      email,
      subject: 'Email Verification - Chatta',
      html: `<p>Your registration has been completed<p>
      <p>Thank you for registering with Chatta.</p>
       <p> >>>
       <a href=${baseUrl}/home> Go to your profile </a> <<< </p>`,
    };
    return this.emailSender(details);
  }

  /**
   * This function sends an email on verification of email address
   * @param {string} email - email address to send the message to
   * @param {string} token - Token generated during signup
   * @returns {boolean} specifies if a verification email was sent to user
   * after registration
   */
  async sendOfflineMail(payload) {
    const details = {
      email: payload.email,
      subject: `${payload.botName} from ITHorizons`,
      html: `<p>Hi dear<p>
      <p>This is to test that delay email works</p>
       <p> >>>
       <a href=${baseUrl}/home> Go to your profile </a> <<< </p>`,
    };
    return this.emailSender(details);
  }

  /**
   * This function sends an email to reset password
   * @param {string} email - email address to send the message to
   * @returns {boolean} specifies if a verification email was sent to user
   * after registration
   */
  async resetPassword(email) {
    const details = {
      email,
      subject: 'Reset Password - Chatta',
      html: `<div>
        <p>Click on the button below to reset your password.</p>
        <button style="color: white; background-color: #2084ba; 
        border: none; border-radius: 10px; text-align: center;
        padding: 10px;">
        <a  href="${baseUrl}"
          style="text-decoration: none; color: white;">
        Reset Password</a></button>
        </div>`,
    };
    return this.emailSender(details);
  }

  /**
   *
   * @param {object} details - Object containing info for sending email
   * @returns {boolean} sends email to users
   */
  async emailSender(details) {
    console.log('emailsender:')
    const msg = {
      from: process.env.mail_master,
      html: details.html,
      subject: details.subject,
      to: details.email,
    };
    try {
      const isEmailSent = await this.sendGrid.send(msg);
      if (isEmailSent) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
