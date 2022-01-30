import { Role } from '@shared/enums/role.enum';

export class ReadFilePaymentProofDTO {
  readonly id: string;
  readonly userId: string;
  readonly userRoles: Role[];
}
