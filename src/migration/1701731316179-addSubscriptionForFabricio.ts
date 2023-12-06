import { Plan } from '../entity/Plans';
import { Subscription } from '../entity/Subscriptions';
import { User } from '../entity/Users';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionForFabricio1701731316179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const subscriptionRepository = queryRunner.manager.getRepository(Subscription);
    const planRepository = queryRunner.manager.getRepository(Plan);

    const userToCreateSubscription = await userRepository.findOne({ where: { email: 'flindenm@hotmail.com' } });
    const { id: plan_id } = await planRepository.findOne({ where: { type: 'monthly' } });

    if (userToCreateSubscription) {
      const newSubscription = subscriptionRepository.create({
        user_id: userToCreateSubscription.id,
        plan_id
      });

      await subscriptionRepository.save(newSubscription);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const subscriptionRepository = queryRunner.manager.getRepository(Subscription);
    const planRepository = queryRunner.manager.getRepository(Plan);

    const userToRemoveSubscription = await userRepository.findOne({ where: { email: 'flindenm@hotmail.com' } });
    const { id: plan_id } = await planRepository.findOne({ where: { type: 'monthly' } });

    if (userToRemoveSubscription) {
      const subscriptionToRemove = await subscriptionRepository.findOne({
        where: {
          user_id: userToRemoveSubscription.id,
          plan_id
        }
      });

      if (subscriptionToRemove) {
        await subscriptionRepository.remove(subscriptionToRemove);
      }
    }
  }
}
