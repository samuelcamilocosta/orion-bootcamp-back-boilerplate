import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeColumnNamesPlanCards1701112228894 implements MigrationInterface {
  /**
   * This method is called when the migration is applied.
   * It changes the field names for planCard objects
   * @param  queryRunner - OThe TypeORM query executor.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('planCards', 'planCardTitle', 'cardTitle');
    await queryRunner.renameColumn('planCards', 'planCardDescription', 'cardDescription');
    await queryRunner.renameColumn('planCards', 'planCardImage', 'cardImage');
    await queryRunner.renameColumn('planCards', 'planCardButtonText', 'cardButtonText');
  }

  /**
   * This method is called when the migration is reverted.
   * It changes the field names for planCard objects back
   * @param  queryRunner - OThe TypeORM query executor.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('planCards', 'cardTitle', 'planCardTitle');
    await queryRunner.renameColumn('planCards', 'cardDescription', 'planCardDescription');
    await queryRunner.renameColumn('planCards', 'cardImage', 'planCardImage');
    await queryRunner.renameColumn('planCards', 'cardButtonText', 'planCardButtonText');
  }
}
