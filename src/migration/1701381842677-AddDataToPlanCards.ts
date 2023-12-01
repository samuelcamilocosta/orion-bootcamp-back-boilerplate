import { PlanCard } from '../entity/PlanCard';
import { MigrationInterface, QueryRunner, DeepPartial } from 'typeorm';

const PLANCARDS: DeepPartial<PlanCard>[] = [
  {
    cardTitle: 'Plano Pesquisador (Premium)',
    cardDescription: 'Desbloqueie acesso total às maravilhas de Marte com o Plano Pesquisador (Premium) do Orion Marte.',
    cardImage: 'http://amigoviolao.com/wp-content/uploads/2023/11/img_pesquisador_plan_Orion_Marte.jpg',
    cardImageDescription: 'Astronauta',
    cardButtonText: 'VEJA COMO SE TORNAR UM PESQUISADOR'
  },
  {
    cardTitle: 'Plano Astronauta (Enterprise)',
    cardDescription:
      'Maximize seu potencial explorador com o Plano Astronauta: soluções personalizadas, suporte exclusivo e pacote Premium.',
    cardImage: 'http://amigoviolao.com/wp-content/uploads/2023/11/img_astronauta_plan_Orion_Marte.jpg',
    cardImageDescription: 'Astronauta em marte',
    cardButtonText: 'VEJA COMO SE TORNAR UM ASTRONAUTA'
  }
];

/**
 * Saves the above data as PlanCards in the database
 */
export class AddDataToPlanCards1701381842677 implements MigrationInterface {
  /**
   * up
   *
   * For each of the PLANCARDS objects, creates a new entry for the PlanCard Entity
   *
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const planCard of PLANCARDS) {
      const newPlanCard = await queryRunner.manager.create('PlanCard', {
        cardTitle: planCard.cardTitle,
        cardDescription: planCard.cardDescription,
        cardImage: planCard.cardImage,
        cardImageDescription: planCard.cardImageDescription,
        cardButtonText: planCard.cardButtonText
      });

      await queryRunner.manager.save('PlanCard', newPlanCard);
    }
  }

  /**
   * down
   *
   * Deletes PlanCards from the PlanCardEntity, if they match PLANCARDS objects.
   *
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const planCard of PLANCARDS) {
      await queryRunner.manager.delete('PlanCards', { cardTitle: planCard.cardTitle });
    }
  }
}
