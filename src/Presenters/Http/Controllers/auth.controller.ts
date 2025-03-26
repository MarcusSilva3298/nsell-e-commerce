import { Body, Controller, Inject, Post } from '@nestjs/common';
import { User } from '../../../Domain/Entities/User';
import { SignInDto } from '../../../Domain/Shared/Dtos/Auth/SignInDto';
import { SignUpDto } from '../../../Domain/Shared/Dtos/Auth/SignUpDto';
import { AuthUseCasesEnum } from '../../../Domain/Shared/Enums/AuthUseCasesEnum';
import { ISignResponse } from '../../../Domain/Shared/Interfaces/ISignInResponse';
import { ISignUpResponse } from '../../../Domain/Shared/Interfaces/ISignUpResponse';
import { IUseCase } from '../../../Domain/Shared/Interfaces/IUseCase';
import { Token } from '../Decorators/token.decorator';

@Controller('/auth')
export class AuthController {
  constructor(
    @Inject(AuthUseCasesEnum.SIGN_IN)
    private readonly signInUseCase: IUseCase<ISignResponse, [SignInDto]>,

    @Inject(AuthUseCasesEnum.SIGN_UP)
    private readonly signUpUseCase: IUseCase<ISignUpResponse, [SignUpDto]>,

    @Inject(AuthUseCasesEnum.CONFIRM_EMAIL)
    private readonly confirmEmailUseCase: IUseCase<User, [string]>,
  ) {}

  @Post('/signIn')
  signIn(@Body() body: SignInDto): Promise<ISignResponse> {
    return this.signInUseCase.execute(body);
  }

  @Post('/signUp')
  signUp(@Body() body: SignUpDto): Promise<ISignUpResponse> {
    return this.signUpUseCase.execute(body);
  }

  @Post('/confirmEmail')
  confirmEmail(@Token() token: string): Promise<User> {
    return this.confirmEmailUseCase.execute(token);
  }
}
