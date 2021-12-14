import { BadRequestException } from '@nestjs/common';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class FileDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  mimeType?: string;

  @IsOptional()
  @IsString()
  originalName?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;

  validatePathFile(compare: string) {
    if (!this.path.includes(compare)) {
      throw new BadRequestException(
        `File with ID: ${this.id} can't be downloaded via this route`,
      );
    }
  }
}
