import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignInDto } from '../../../Domain/Shared/Dtos/Auth/SignInDto';
import { AuthUseCasesEnum } from '../../../Domain/Shared/Enums/AuthUseCasesEnum';
import { ISignResponse } from '../../../Domain/Shared/Interfaces/ISignInResponse';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthUseCasesEnum.SIGN_IN)
    private readonly signInUseCase: IUseCase<ISignResponse, [SignInDto]>,
  ) {}

  @Post('/signIn')
  signIn(@Body() body: SignInDto): Promise<ISignResponse> {
    return this.signInUseCase.execute(body);
  }
}
