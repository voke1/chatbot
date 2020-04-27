export class CreateClientDto {
  readonly FullName: string;
  readonly email: string;
  readonly phone: number;
  readonly password: string;
  readonly isAdmin: boolean;
  readonly role: string;
  readonly isEnabled: boolean;
  readonly isCreated?: boolean;
  readonly isRegistered?: boolean;
  readonly isChecked?: boolean;
}
