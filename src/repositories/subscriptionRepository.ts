import { MysqlDataSource } from '../config/database';
import { Subscription } from '../entity/Subscriptions';
import { DeepPartial } from 'typeorm';

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
   * @returns {Promise<Subscription | void>} The created Subscription object or void.
   */
  public static async createSubscription(newSubscription: DeepPartial<Subscription>): Promise<Subscription> {
    const { user_id, plan_id } = newSubscription;

    console.log(user_id, plan_id);

    const userAlreadyHasActiveSubscription = await this.getSubscriptionByUserId(user_id);

    if (userAlreadyHasActiveSubscription) {
      console.log(userAlreadyHasActiveSubscription);
      return;
    }

    const subscription = MysqlDataSource.getRepository(Subscription).create({ user_id, plan_id });

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
