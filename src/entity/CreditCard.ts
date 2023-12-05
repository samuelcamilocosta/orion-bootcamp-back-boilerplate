import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'creditCards' })
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

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
