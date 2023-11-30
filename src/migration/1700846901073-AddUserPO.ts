import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Array de usuários a serem adicionados na migração.
 */
const USERS = [
  {
    email: 'andriele.mallon@gmail.com',
    password: 'Pa$$word123',
    role: 'Free'
  },
  {
    email: 'charllotem@gmail.com',
    password: 'Pa$$word123',
    role: 'Premium'
  }
];

export class AddUserPO1700846440167 implements MigrationInterface {
  /**
   * This method is called when the migration is applied.
   * It creates and saves new users in the database.
   * @param  queryRunner - The TypeORM query executor.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      const newUser = queryRunner.manager.create('User', {
        email: user.email,
        password: user.password,
        role: user.role
      });

      await queryRunner.manager.save('User', newUser);
    }
  }
  /**
   * This method is called when the migration is reverted.
   * It deletes the users added by the up method.
   * @param queryRunner - The TypeORM query executor.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      await queryRunner.manager.delete('Users', { email: user.email });
    }
  }
}
