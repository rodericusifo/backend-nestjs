import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({
    name: 'path',
    type: 'text',
    nullable: false,
  })
  path: string;

  @Column({ name: 'mimeType', type: 'text', nullable: false })
  mimeType: string;

  @Column({ name: 'originalName', type: 'text', nullable: false })
  originalName: string;

  @Column({ name: 'userId', type: 'text', nullable: false, select: false })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
