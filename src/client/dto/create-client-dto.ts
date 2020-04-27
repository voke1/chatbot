export class CreateClientDto {
  readonly id?: string;
  readonly clientId: string;
  readonly companyId: string;
  readonly fullName: string;
  readonly paymentPlan: string;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
  readonly isVerified: boolean;
  readonly date: Date;
  readonly isAdmin: boolean;
  readonly isCreated?: boolean;
  readonly isEnabled: boolean;

}
