import { UnauthorizedException } from '@nestjs/common';
import { Role } from '@shared/enum/role.enum';
import * as bcrypt from 'bcrypt';

export class UserDTO {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  roles?: Role[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  setAsAdmin() {
    this.roles = [Role.Admin];
  }

  setAsCustomer() {
    this.roles = [Role.Customer];
  }

  async encryptPassword(passwordSaltLength: number) {
    if (!this.password) {
      throw new UnauthorizedException(`Password needed for encryption process`);
    }
    this.password = await bcrypt.hash(this.password, passwordSaltLength);
  }

  async decryptPasswordAndValidate(password: string) {
    const isPasswordValid = await bcrypt.compare(password, this.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `Combination between Email and Password doesn't match`,
      );
    }
  }
}
