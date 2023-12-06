import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { UpdatedHomePageCard } from '../entity/UpdatedHomePageCards';
import { updatedHOMEPAGECARD } from '../constants/updatedHomePageCards';

/**
 * Migration to add new attributes to HomePageCards.
 */
export class NewAtributesHomePageCards1701618166924 implements MigrationInterface {
  /**
   * Run the migration.
   * @param queryRunner - The query runner provided by TypeORM.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    const homePageCardRepository = queryRunner.connection.getRepository(UpdatedHomePageCard);

    for (const homePageCardData of updatedHOMEPAGECARD) {
      const newHomePageCard = homePageCardRepository.create({
        cardTitle: homePageCardData.cardTitle,
        cardImage: homePageCardData.cardImage,
        cardImageDescription: homePageCardData.cardImageDescription,
        cardButtonText: homePageCardData.cardButtonText,
        cardDescription: homePageCardData.cardDescription,
        cardAccess: homePageCardData.cardAccess,
        cardPath: homePageCardData.cardPath
      });

      await homePageCardRepository.save(newHomePageCard);
    }
  }

  /**
   * Revert the migration.
   * @param queryRunner - The query runner provided by TypeORM.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    const homePageCardRepository = queryRunner.connection.getRepository(UpdatedHomePageCard);

    for (const homePageCardData of updatedHOMEPAGECARD) {
      const cardToDelete = await homePageCardRepository.findOneBy({ cardTitle: homePageCardData.cardTitle });
      if (cardToDelete) {
        await homePageCardRepository.delete(cardToDelete.cardId);
      }
    }
  }
}
