import { Inject, Injectable } from '@nestjs/common';
import {
  IMailer,
  IRequestInfos,
  IUser,
} from './interface/mailerData.interface';
import { Content } from 'mailgen';
import { MailerService } from '@nestjs-modules/mailer';

const Mailgen = require('mailgen');

@Injectable()
export class MicroSSMailerService {
  constructor(@Inject(MailerService) private readonly mailer: MailerService) {}

  private urlGen(request: IRequestInfos): string {
    const protocol = request.protocol;
    const host = request.host;
    const originalUrl = request.originalUrl;
    const fullUrl = `${protocol}://${host}${originalUrl}`;

    return fullUrl;
  }

  private createForgetEmail(user: IUser, request: IRequestInfos) {
    const mailgen = new Mailgen({
      theme: 'default',
      product: {
        name: 'Reset Password - Social Project',
        link: request.protocol + request.host,
      },
    });

    const link = this.urlGen(request).replace(
      'send-reset-password',
      'new-password',
    );

    const emailBody: Content = {
      body: {
        name: user.name,
        intro: 'Reset your password',
        action: {
          instructions:
            'Clique no botão agora para seguir o fluxo do reset de senha.',
          button: {
            color: '#0099FF',
            text: 'Esqueci minha senha',
            link: `${link}?token=${user.resetToken}`,
          },
        },
        outro: 'Need help? Please, send me a email',
      },
    };

    const email = mailgen.generate(emailBody);

    return email;
  }

  async sendForgotEmail({ user, request }: IMailer): Promise<void> {
    const htmlToBeSented = this.createForgetEmail(user, request);

    if (htmlToBeSented) {
      await this.mailer.sendMail({
        to: user.email,
        from: 'guisix16@gmail.com',
        subject: 'Reset your password - Social Project',
        html: htmlToBeSented,
      });
    }

    return;
  }
}
