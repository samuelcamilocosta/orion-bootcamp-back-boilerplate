import { MysqlDataSource } from '../config/database';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, AfterLoad } from 'typeorm';
import { Plan } from './Plans';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  plan_id: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  ended_at: Date;

  @AfterLoad()
  async setStatus(): Promise<void> {
    const { type } = await MysqlDataSource.getRepository(Plan).findOneBy({ id: this.plan_id });
    const typeToDays = {
      monthly: 30,
      semesterly: 180,
      annually: 365
    };
    const days = typeToDays[type];
    const X_DAYS_IN_MS = days * 24 * 60 * 60 * 1000; // x dias em milissegundos
    const currentDate = new Date();
    const endOfPlanDay = new Date(this.started_at.getTime() + X_DAYS_IN_MS);
    if (currentDate <= endOfPlanDay) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
}
