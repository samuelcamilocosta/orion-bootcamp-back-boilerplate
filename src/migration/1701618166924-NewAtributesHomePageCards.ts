import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { UpdatedHomePageCard } from '../entity/UpdatedHomePageCards';
import { updatedHOMEPAGECARD } from '../constants/updatedHomePageCards';

export class NewAtributesHomePageCards1701618166924 implements MigrationInterface {
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
