import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class HomePageCard {
  @PrimaryGeneratedColumn()
  cardId: number;

  @Column()
  cardTitle: string;

  @Column()
  cardImage: string;

  @Column({ nullable: true })
  cardImageDescription: string;

  @Column({ nullable: true })
  cardButtonText: string;

  @Column()
  cardDescription: string;

  @Column()
  cardAccess: string;

  @Column()
  cardPath: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
