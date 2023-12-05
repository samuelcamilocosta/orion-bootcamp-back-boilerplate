import { MysqlDataSource } from '../config/database';
import { UpdatedHomePageCard } from '../entity/UpdatedHomePageCards';

/**
 * Repository for HomePageCard entity.
 */
export class HomePageCardRepository {
  static repository = MysqlDataSource.getRepository(UpdatedHomePageCard);

  /**
   * Find all HomePageCards in the database.
   * @returns A promise that resolves to an array of HomePageCards.
   */
  public static async findAllHomePageCards(): Promise<UpdatedHomePageCard[]> {
    return this.repository.find();
  }

  /**
   * Find a single HomePageCard by its ID.
   * @param id - The ID of the HomePageCard to find.
   * @returns A promise that resolves to the HomePageCard if found, undefined otherwise.
   */
  public static async findOneHomePageCard(id: number): Promise<UpdatedHomePageCard> {
    return this.repository.findOneBy({ cardId: id });
  }

  /**
   * Create a new HomePageCard in the database.
   * @param card - The data to create the HomePageCard with.
   * @returns A promise that resolves to the created HomePageCard.
   */
  public static async createHomePageCard(card: Partial<UpdatedHomePageCard>): Promise<UpdatedHomePageCard> {
    return this.repository.save(this.repository.create(card));
  }
}
