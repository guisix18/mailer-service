import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroSSMailerService } from './mailer.service';
import { IMailer } from './interface/mailerData.interface';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MicroSSMailerService) {}

  @MessagePattern('send_forgot_email')
  async sendForgotEmail(@Payload() message: IMailer) {
    return await this.mailerService.sendForgotEmail(message);
  }
}
