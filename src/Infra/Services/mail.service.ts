import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';
import { ISendVerifyEmail } from '../../Domain/Shared/Interfaces/ISendVerifyEmail';
import { EnviromentService } from './enviroment.service';

@Injectable()
export class MailService {
  private readonly host: string;

  constructor(
    enviromentService: EnviromentService,
    private readonly mailerService: MailerService,
  ) {
    this.host = enviromentService.get(EnvVariablesEnum.HOST);
  }

  private sendMail(
    to: string,
    subject: string,
    template: string,
    context: object,
  ): void {
    try {
      this.mailerService.sendMail({
        from: 'contatct@nsell.com',
        to,
        subject,
        template,
        context,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to send mail', error);
    }
  }

  sendVerifyEmail(to: string, context: ISendVerifyEmail): void {
    const href = this.host.concat(`/auth/confirmEmail?token=${context.token}`);

    this.sendMail(to, 'Verify Your E-mail', 'verifyEmail', {
      ...context,
      href,
    });
  }
}
