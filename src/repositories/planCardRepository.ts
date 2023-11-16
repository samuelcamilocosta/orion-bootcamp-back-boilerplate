import { MysqlDataSource } from '../config/database';
import { PlanCard } from '../entity/PlanCard';

export class PlanCardRepository {
  /**
   * findPlanCardById
   *
   * Finds a plan card in the database through a given id
   *
   * @param id used as reference to find the plan card.
   * @returns {Promise<PlanCard | undefinded>} Returns plan card or not
   */
  public static async findPlanCardById(id: number): Promise<PlanCard | undefined> {
    return MysqlDataSource.getRepository(PlanCard).findOneBy({ id });
  }

  /**
   * getAllPlanCards
   *
   * Gets all plan cards;
   *
   * @returns {Promise<PlanCard[] | undefinded>} Returns all plan cards if any or undefined if none.
   */
  public static async getAllPlanCards(): Promise<PlanCard[] | undefined> {
    return MysqlDataSource.getRepository(PlanCard).find();
  }

  /**
   * newPlanCard
   *
   * Saves a new Plan Card to the database;
   *
   * @returns {Promise<PlanCard>} a new Plan Card.
   */
  public static async newPlanCard(title: string, description: string, image: string, buttonText: string): Promise<PlanCard> {
    const newPlanCard: PlanCard = new PlanCard();
    newPlanCard.planCardTitle = title;
    newPlanCard.planCardDescription = description;
    newPlanCard.planCardImage = image;
    newPlanCard.planCardButtonText = buttonText;

    return await MysqlDataSource.getRepository(PlanCard).save(newPlanCard);
  }
}
