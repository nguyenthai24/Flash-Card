import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/schemas/user.schemas';
import { AuthUserRecord } from '../auth/interfaces/auth-repository.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: AuthUserRecord | null, token: string) {
    console.log('User', user);
    console.log(token);
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user?.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './verification-code', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        // name: user.name,
        url,
      },
    });
  }
}
