import { MysqlDataSource } from '../config/database';
import { CreditCard } from '../entity/CreditCard';
import { DeepPartial } from 'typeorm';

/**
 * Repository class to handle Credit Cards
 */
export class CreditCardRepository {
  /**
   * Saves a new credit card to the database.
   *
   * @param cardData - The credit card deep partial to be saved (all fields except id and created_at).
   * @returns {Promise<CreditCard>} The saved Credit Card object.
   */
  public static async saveCreditCard(cardData: DeepPartial<CreditCard>): Promise<CreditCard> {
    return MysqlDataSource.getRepository(CreditCard).save(cardData);
  }
}
