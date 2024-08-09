import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  userName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  socialId: string;

  @Column({ type: 'enum', enum: ['kakao', 'google'], nullable: true })
  socialType: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], nullable: true })
  Role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
