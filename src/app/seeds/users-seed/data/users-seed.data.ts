import { UserDTO } from '@app/users/dto/user.dto';
import { plainToInstance } from 'class-transformer';

export const usersSeedDatas: UserDTO[] = plainToInstance(UserDTO, [
  {
    id: '3b662a52-9de1-4c93-9e1f-998de6eedd87',
    name: 'Miss Lonny Bechtelar',
    email: 'Lonny.Bechtelar@yahoo.com',
    password: 'P@ssw0rd',
  },
]);
