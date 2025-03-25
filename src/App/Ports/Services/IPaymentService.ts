import { ICreatePaymentResponse } from '../../../Domain/Shared/Interfaces/ICreatePaymentResponse';

export interface IPaymentService {
  createPayment(amount: number, token: string): Promise<ICreatePaymentResponse>;
}
