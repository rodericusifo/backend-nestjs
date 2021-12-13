import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SubmitOrderPaymentProofDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;

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
  @IsString()
  readonly urlOrigin: string;
}
