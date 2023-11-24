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
   * Este método é chamado quando a migração é aplicada.
   * Ele cria e salva novos usuários no banco de dados.
   * @param  queryRunner - O executor de consultas do TypeORM.
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
   * Este método é chamado quando a migração é revertida.
   * Ele deleta os usuários adicionados pelo método up.
   * @param queryRunner - O executor de consultas do TypeORM.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const user of USERS) {
      await queryRunner.manager.delete('Users', { email: user.email });
    }
  }
}
