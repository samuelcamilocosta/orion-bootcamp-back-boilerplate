import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class HomePageCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  imageDescription: string;

  @Column()
  buttonText: string;

  @Column()
  description: string;

  @Column()
  access: string;
}
