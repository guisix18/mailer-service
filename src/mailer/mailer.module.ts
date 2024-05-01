import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerController } from './mailer.controller';
import { MicroSSMailerService } from './mailer.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SOCIAL_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'social',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'social-group',
          },
        },
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_NEW_PASS,
      signOptions: { expiresIn: 400 },
    }),
  ],
  controllers: [MailerController],
  providers: [MicroSSMailerService],
})
export class MicroSSMailerModule {}
