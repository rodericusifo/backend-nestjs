/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderStatus } from '@shared/enum/order-status.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'title', type: 'text', nullable: false })
  title: string;

  @Column({
    name: 'status',
    type: 'text',
    nullable: true,
    default: OrderStatus.Draft,
  })
  status: OrderStatus;

  @Column({
    name: 'paymentProofLink',
    type: 'text',
    nullable: true,
    default: null,
  })
  paymentProofLink: string;

  @Column({ name: 'name', type: 'text', nullable: false })
  name: string;

  @Column({ name: 'phoneNumber', type: 'text', nullable: false })
  phoneNumber: string;

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string;

  @Column({ name: 'address', type: 'text', nullable: false })
  address: string;

  @Column({ name: 'userId', type: 'text', nullable: false })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
