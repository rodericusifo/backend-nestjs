import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import * as faker from 'faker';

export class UsersSeedBuilder {
  static build(total: number): CreateUserDTO[] {
    const array: CreateUserDTO[] = [];

    for (let i = 0; i < total; i++) {
      const fakerFirstName = faker.name.firstName();
      const fakerLastName = faker.name.lastName();
      const item: CreateUserDTO = {
        email: faker.internet.email(fakerFirstName, fakerLastName),
        name: faker.name.findName(fakerFirstName, fakerLastName),
        password: 'P@ssw0rd',
      };
      array.push(item);
    }

    return array;
  }
}
