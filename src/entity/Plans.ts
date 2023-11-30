import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'plans' })
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['monthly', 'semesterly', 'annually'] })
  type: 'monthly' | 'semesterly' | 'annually';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
