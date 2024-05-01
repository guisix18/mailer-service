import { Module } from '@nestjs/common';
import { MicroSSMailerModule } from './mailer/mailer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import 'dotenv/config';

@Module({
  imports: [
    MicroSSMailerModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }),
  ],
})
export class AppModule {}
