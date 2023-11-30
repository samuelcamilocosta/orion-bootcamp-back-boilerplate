import { MysqlDataSource } from '../config/database';
import { Plan } from './../entity/Plans';

/**
 * Repository handling Plan-related database queries.
 */
export class PlanRepository {
  /**
   * Retrieves plans from the database, optionally paginated.
   *
   * @returns {Promise<Plan[]>} Array of Plan objects.
   */
  public static async getPlans(): Promise<Plan[]> {
    return MysqlDataSource.getRepository(Plan).find();
  }

  /**
   * Retrieves a plan by its ID.
   *
   * @param id - The ID of the plan.
   * @returns {Promise<Plan | undefined>} A single Plan object or undefined if not found.
   */
  public static async getPlanById(id: number): Promise<Plan | undefined> {
    return MysqlDataSource.getRepository(Plan).findOneBy({ id });
  }
}
