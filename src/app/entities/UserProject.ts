import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Projects from './Project';
import User from './User';

@Entity('users_projects')
class UserProjects {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int', { nullable: false })
  hours_worked: number;

  @Column('int', { nullable: false })
  id_user: number;

  @Column('int', { nullable: false })
  id_project: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.userProjects)
  @JoinColumn({ name: 'id_user' })
  users: User;

  @ManyToOne(() => Projects, (projects) => projects.userProjects)
  @JoinColumn({ name: 'id_project' })
  projects: Projects;
}

export default UserProjects;
