import { MysqlDataSource } from '../config/database';
import { CardPayment } from '../entity/CardPayment';
import { DeepPartial } from 'typeorm';

/**
 * Repository class to handle card payments
 */
export class CardPaymentRepository {
  /**
   * Saves a new card payment to the database.
   *
   * @param cardData - The card payment deep partial to be saved (all fields except id and created_at).
   * @returns {Promise<CardPayment>} The saved card payment object.
   */
  public static async saveCreditCard(cardData: DeepPartial<CardPayment>): Promise<CardPayment> {
    return MysqlDataSource.getRepository(CardPayment).save(cardData);
  }
}
