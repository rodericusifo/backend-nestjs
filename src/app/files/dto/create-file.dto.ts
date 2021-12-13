import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFileDTO {
  @IsNotEmpty()
  @IsString()
  readonly path: string;

  @IsNotEmpty()
  @IsString()
  readonly mimeType: string;

  @IsNotEmpty()
  @IsString()
  readonly originalName: string;

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;
}
