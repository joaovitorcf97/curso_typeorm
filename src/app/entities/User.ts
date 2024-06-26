import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Address from './Address';
import UserProjects from './UserProject';

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
  birth_date: Date;

  @Column('boolean', { nullable: false, default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, (address) => address.users)
  address: Address[];

  @OneToMany(() => UserProjects, (userProjects) => userProjects.users)
  userProjects: UserProjects[];
}

export default User;
