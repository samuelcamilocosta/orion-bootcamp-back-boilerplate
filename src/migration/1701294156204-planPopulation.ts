import { MigrationInterface, QueryRunner } from 'typeorm';

const PLANS = [
  {
    type: 'monthly',
    price: 19.91
  },
  {
    type: 'semesterly',
    price: 109.84
  },
  {
    type: 'annually',
    price: 202.98
  }
];

export class PlanPopulation1701294156204 implements MigrationInterface {
  /**
   * up
   *
   * Executa as operações de inserção de dados na tabela "Plans" durante a migração.
   *
   * @param queryRunner - O QueryRunner utilizado para executar as consultas no banco de dados.* @returns Uma Promise que é resolvida quando a operação é concluída.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const plan of PLANS) {
      const newPlan = await queryRunner.manager.create('Plan', {
        type: plan.type,
        price: plan.price
      });

      await queryRunner.manager.save('Plan', newPlan);
    }
  }

  /**
   * down
   *
   * Executa as operações de exclusão de dados na tabela "Plans" durante a reversão da migração.
   *
   * @param queryRunner - O QueryRunner utilizado para executar as consultas no banco de dados.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const plan of PLANS) {
      await queryRunner.manager.delete('Plan', { type: plan.type, price: plan.price });
    }
  }
}
