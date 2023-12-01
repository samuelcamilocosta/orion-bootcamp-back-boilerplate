import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'planCards' })
export class PlanCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cardTitle: string;

  @Column({ nullable: false })
  cardDescription: string;

  @Column({ nullable: false })
  cardImage: string;

  @Column({ nullable: false })
  cardImageDescription: string;

  @Column({ nullable: false })
  cardButtonText: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
