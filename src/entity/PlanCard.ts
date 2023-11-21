import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'planCards' })
export class PlanCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  planCardTitle: string;

  @Column({ nullable: false })
  planCardDescription: string;

  @Column({ nullable: false })
  planCardImage: string;

  @Column({ nullable: false })
  planCardButtonText: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
