import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'cardPayment' })
export class CardPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  planId: number;

  @Column({ nullable: false })
  cardNumber: string;

  @Column({ nullable: false })
  cardHolderName: string;

  @Column({ nullable: false })
  expirationDate: string;

  @Column({ nullable: false })
  cvv: string;

  @CreateDateColumn()
  created_at: Date;
}
