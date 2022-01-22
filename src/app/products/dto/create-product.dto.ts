export class CreateProductDTO {
  readonly name: string;
  readonly price: number;
  readonly stock: number;
  readonly description?: string;
}
