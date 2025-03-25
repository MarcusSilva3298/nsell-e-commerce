import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { IPaymentService } from '../../App/Ports/Services/IPaymentService';
import { EnvVariablesEnum } from '../../Domain/Shared/Enums/EnvVariablesEnum';
import { ICreatePaymentResponse } from '../../Domain/Shared/Interfaces/ICreatePaymentResponse';
import { EnviromentService } from './enviroment.service';

@Injectable()
export class PaymentService implements IPaymentService {
  private readonly stripe: Stripe;

  constructor(enviromentService: EnviromentService) {
    this.stripe = new Stripe(
      enviromentService.get(EnvVariablesEnum.STRIPE_SECRET_KEY),
    );
  }

  async createPayment(
    amount: number,
    token: string,
  ): Promise<ICreatePaymentResponse> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method: token,
        confirm: true,
        automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      });

      return {
        status: paymentIntent.status,
        message: 'Pagamento aprovado',
      };
    } catch (error) {
      if (error.message.includes('No such PaymentMethod'))
        return { status: 'failed', message: 'Invalid card token' };

      return { status: 'failed', message: error.raw.message };
    }
  }
}
