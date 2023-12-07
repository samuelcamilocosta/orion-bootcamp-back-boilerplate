import { MigrationInterface, QueryRunner } from 'typeorm';
import { UpdatedHomePageCard } from '../entity/UpdatedHomePageCards';
import { updatedHOMEPAGECARD } from '../constants/updatedHomePageCards';

/**
 * Migration to update the cardPath of UpdatedHomePageCard entities.
 */
export class UpdateCardPath1701983917355 implements MigrationInterface {
  /**
   * Updates the cardPath of each UpdatedHomePageCard entity in the database
   * that matches the cardTitle of each item in the updatedHOMEPAGECARD array.
   *
   * @param queryRunner - The QueryRunner instance provided by TypeORM.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    const homePageCardRepository = queryRunner.connection.getRepository(UpdatedHomePageCard);

    for (const homePageCardData of updatedHOMEPAGECARD) {
      await homePageCardRepository.update({ cardTitle: homePageCardData.cardTitle }, { cardPath: homePageCardData.cardPath });
    }
  }
  /**
   * This method is left empty as the changes made by the up method are not reversible.
   *
   * @param queryRunner - The QueryRunner instance provided by TypeORM.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
