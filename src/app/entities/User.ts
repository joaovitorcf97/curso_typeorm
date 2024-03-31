import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false, length: 100 })
  name: string;

  @Column('varchar', { nullable: false, length: 100, unique: true })
  email: string;

  @Column('varchar', { nullable: false, length: 100 })
  password: string;

  @Column('date', { nullable: false })
  birth_date: string;

  @Column('boolean', { nullable: false, default: true })
  active: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
