/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '@app/products/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'quantity', type: 'int', nullable: false })
  quantity: number;

  @Column({ name: 'amount', type: 'int', nullable: false })
  amount: number;

  @ManyToOne(() => Product, (product) => product.carts, {
    nullable: false,
  })
  product: Product;

  @Column({ name: 'orderId', type: 'text', nullable: false })
  orderId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
