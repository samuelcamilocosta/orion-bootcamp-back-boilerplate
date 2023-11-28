import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/Users';

/**
 * This class represents a migration to insert (and remove) names for the team users.
 */
export class SetNamesToTeamUsers1701193920951 implements MigrationInterface {
  /**
   * up
   * Run the migration and add names to our team users using the first part of each email (before @)
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersWithEmptyName = await queryRunner.manager.find(User, { where: { name: '' } });

    await queryRunner.manager.transaction(async (transactionalEntityManager) => {
      for (const user of usersWithEmptyName) {
        user.name = user.email.split('@')[0];
        await transactionalEntityManager.save(User, user);
      }
    });
  }

  /**
   * down
   * Run the migration and add empty strings as names to our team users.
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    const allUsers: User[] = await queryRunner.manager.find(User);

    for (const user of allUsers) {
      const nameMatchesEmail: boolean = user.name === user.email.split('@')[0];

      if (nameMatchesEmail) {
        await queryRunner.manager.transaction(async (transactionalEntityManager) => {
          user.name = '';
          await transactionalEntityManager.save(User, user);
        });
      }
    }
  }
}
