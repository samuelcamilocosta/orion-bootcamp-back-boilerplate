import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, AfterLoad, BeforeUpdate } from 'typeorm';

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  plan_id: number;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @CreateDateColumn()
  started_at: Date;

  @Column({ type: 'timestamp' })
  ended_at: Date;

  @AfterLoad()
  setStatusDescription() {
    const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias em milissegundos
    const currentDate = new Date();
    const thirtyDaysAfterStart = new Date(this.started_at.getTime() + THIRTY_DAYS_IN_MS);
    if (currentDate <= thirtyDaysAfterStart) {
      this.status = 'active';
    } else {
      this.status = 'inactive';
    }
  }

  @BeforeUpdate()
  async beforeUpdateSetEndDate() {
    if (this.status === 'inactive' && !this.ended_at) {
      this.ended_at = new Date();
    }
  }
}
