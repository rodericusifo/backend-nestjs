/* eslint-disable @typescript-eslint/no-unused-vars */
import { Role } from '@shared/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'text', nullable: false })
  name: string;

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string;

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @Column({ name: 'roles', type: 'text', array: true, nullable: false })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
