import { MigrationInterface, QueryRunner } from 'typeorm';

const PLANS = [
  {
    type: 'monthly',
    price: 19.91,
    saves_percentage: null,
    description: null
  },
  {
    type: 'semesterly',
    price: 109.84,
    saves_percentage: 8,
    description: 'Equivalente a R$ 18,30 por mês.'
  },
  {
    type: 'annually',
    price: 202.98,
    saves_percentage: 15,
    description: 'Equivalente a R$ 16,92 por mês.'
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
        price: plan.price,
        saves_percentage: plan.saves_percentage,
        description: plan.description
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
      await queryRunner.manager.delete('Plan', {
        type: plan.type,
        price: plan.price,
        saves_percentage: plan.saves_percentage,
        description: plan.description
      });
    }
  }
}
