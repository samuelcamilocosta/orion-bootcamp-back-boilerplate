import { MysqlDataSource } from '../config/database';
import { Subscription } from './../entity/Subscriptions';

/**
 * Repository handling Subscription-related database queries.
 */
export class SubscriptionRepository {
  /**
   * Retrieves a subscription by user ID.
   *
   * @param userId - The ID of the user.
   * @returns {Promise<Subscription | undefined>} A single Subscription object or undefined if not found.
   */
  public static async getSubscriptionByUserId(userId: number): Promise<Subscription | undefined> {
    const subscription = await MysqlDataSource.getRepository(Subscription).findOne({ where: { user_id: userId, active: true } });
    if (subscription && subscription.active === false) {
      this.deactivateSubscription(Number(subscription.id));
    }
    return subscription;
  }

  /**
   * Creates a new subscription.
   *
   * @param newSubscription - The data for the new subscription.
   * @returns {Promise<Subscription>} The created Subscription object.
   */
  public static async createSubscription(newSubscription: Partial<Subscription>): Promise<Subscription> {
    const subscription = MysqlDataSource.getRepository(Subscription).create(newSubscription);

    return MysqlDataSource.getRepository(Subscription).save(subscription);
  }

  /**
   * Deactivates a subscription by setting it as inactive and setting the ended date.
   *
   * @param subscriptionId - The ID of the subscription to deactivate.
   * @returns {Promise<void>}
   */
  public static async deactivateSubscription(subscriptionId: number): Promise<Subscription | undefined> {
    const subscription = await MysqlDataSource.getRepository(Subscription).findOneBy({ id: subscriptionId });

    await MysqlDataSource.getRepository(Subscription).update(subscription.id, { active: false, ended_at: new Date() });

    return;
  }
}
