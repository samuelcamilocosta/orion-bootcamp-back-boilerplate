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

  /**
   * Creates a new plan.
   *
   * @param planData - The data for the new plan.
   * @returns {Promise<Plan>} The created Plan object.
   */
  public static async createPlan(planData: Partial<Plan>): Promise<Plan> {
    const newPlan = MysqlDataSource.getRepository(Plan).create(planData);

    return MysqlDataSource.getRepository(Plan).save(newPlan);
  }

  /**
   * Deletes a plan by its ID.
   *
   * @param id - The ID of the plan to delete.
   * @returns {Promise<boolean>} Returns true if the plan is successfully deleted, otherwise returns false.
   */
  public static async deletePlanById(id: number): Promise<boolean> {
    const plan = await MysqlDataSource.getRepository(Plan).findOneBy({ id });

    if (!plan) {
      return false;
    }

    await MysqlDataSource.getRepository(Plan).remove(plan);
    return true;
  }
}
