export class CreatePaymentDto {
  readonly id?: string;
  readonly botId: string;
  readonly reference: string;
  readonly message: string;
  readonly name: string;
  readonly email: string;
  readonly amount: number;
  readonly status: string;
  readonly created_at: string;



}
