import { MysqlDataSource } from '../config/database';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, AfterLoad } from 'typeorm';


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
    const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias em milissegundos
    const currentDate = new Date();
    const thirtyDaysAfterStart = new Date(this.started_at.getTime() + THIRTY_DAYS_IN_MS);
    if (currentDate <= thirtyDaysAfterStart) {
      this.active = true;
    } else {
      this.active = false;
      if (this.ended_at === null) {
        this.ended_at = new Date();
      }
    }
    await MysqlDataSource.getRepository(Subscription).update(this.id, {
      active: this.active,
      ended_at: this.ended_at
    });
  }
}
