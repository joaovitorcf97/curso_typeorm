import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserProjects from './UserProject';

@Entity('projects')
class Projects {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: false, length: 100, unique: true })
  name: string;

  @Column('varchar', { nullable: false, length: 255 })
  description: string;

  @Column('date', { nullable: false })
  start_at: Date;

  @Column('date', { nullable: false })
  end_at: Date;

  @Column('boolean', { nullable: false, default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserProjects, (userProjects) => userProjects.projects)
  userProjects: UserProjects[];
}

export default Projects;
