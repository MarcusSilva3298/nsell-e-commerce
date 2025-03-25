import Stripe from 'stripe';

export interface ICreatePaymentResponse {
  status: Stripe.PaymentIntent.Status | 'failed';
  message: string;
}
