import { BadRequestException } from '@nestjs/common';

export class FileDTO {
  id?: string;
  path?: string;
  mimeType?: string;
  originalName?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  validatePathFile(compare: string) {
    if (!this.path.includes(compare)) {
      throw new BadRequestException(
        `File with ID: ${this.id} can't be downloaded via this route`,
      );
    }
  }
}
