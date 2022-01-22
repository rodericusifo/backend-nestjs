export class UpdateProductDTO {
  readonly id: string;
  readonly name?: string;
  readonly price?: number;
  readonly stock?: number;
  readonly description?: string;
}
