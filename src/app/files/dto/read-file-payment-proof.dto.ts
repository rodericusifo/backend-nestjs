import { Role } from '@shared/enum/role.enum';

export class ReadFilePaymentProofDTO {
  readonly id: string;
  readonly userId: string;
  readonly userRoles: Role[];
}
