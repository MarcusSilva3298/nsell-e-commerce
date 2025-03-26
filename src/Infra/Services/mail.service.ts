import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import hbs, { HbsTransporter } from 'nodemailer-express-handlebars';
import { join } from 'path';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';
import { ISendVerifyEmail } from '../../Domain/Shared/Interfaces/ISendVerifyEmail';
import { EnviromentService } from './enviroment.service';

@Injectable()
export class MailService {
  private readonly transporter: HbsTransporter;

  constructor(enviromentService: EnviromentService) {
    this.transporter = createTransport({
      host: enviromentService.get(EnvVariablesEnum.MAILTRAP_HOST),
      port: enviromentService.get(EnvVariablesEnum.MAILTRAP_PORT),
      auth: {
        user: enviromentService.get(EnvVariablesEnum.MAILTRAP_AUTH_USER),
        pass: enviromentService.get(EnvVariablesEnum.MAILTRAP_AUTH_PASS),
      },
    });

    const templatesFolder = join(__dirname, '..', '..', '..', '..', 'views');

    this.transporter.use(
      'compile',
      hbs({
        extName: '.hbs',
        viewPath: templatesFolder,
        viewEngine: {
          extname: '.hbs',
          partialsDir: templatesFolder,
          layoutsDir: templatesFolder,
          defaultLayout: undefined,
        },
      }),
    );
  }

  private sendMail(
    to: string,
    subject: string,
    template: string,
    context: object,
  ): void {
    try {
      this.transporter.sendMail({
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
    this.sendMail(to, 'Verify Your E-mail', 'verifyEmail', context);
  }
}
