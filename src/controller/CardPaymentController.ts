import { Request, Response } from 'express';
import { DeepPartial } from 'typeorm';
import { CardPayment } from '../entity/CardPayment';
import { CardPaymentRepository } from '../repositories/cardPaymentRepository';
import { JwtUtils } from '../library/jwtUtils';
import { SubscriptionRepository } from '../repositories/subdcriptionRepository';
import { Subscription } from '../entity/Subscriptions';

/**
 * Controller for validating credit card data on payments
 */
export class CardPaymentController {
  /**
   * @swagger
   * /v1/card-payment:
   *   post:
   *     summary: CardPayment
   *     tags: [Credit Card Payment]
   *     description: Credit card payment
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *                 example: yourTokenHere
   *               planId:
   *                 type: string
   *                 example: 1
   *               cardNumber:
   *                 type: string
   *                 example: 4800 0000 0000 0004
   *               cardHolderName:
   *                 type: string
   *                 example: José da Silva
   *               expirationDate:
   *                 type: string
   *                 example: 10/26
   *               cvv:
   *                 type: string
   *                 example: 123
   *     responses:
   *       '200':
   *           description: Payment made successfully
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *       '500':
   *         description: Payment internal error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async acceptCreditCardPayment(req: Request, res: Response): Promise<void> {
    try {
      const { token, planId, cardNumber, cardHolderName, expirationDate, cvv } = req.body;

      const userId = await JwtUtils.getUserIdFromToken(token);

      if (typeof userId !== 'number') {
        res.status(400).json({ error: 'Erro ao decodificar o token' });
        return;
      }

      const newCreditCard: DeepPartial<CardPayment> = {
        userId,
        planId,
        cardNumber,
        cardHolderName,
        expirationDate,
        cvv
      };

      await CardPaymentRepository.saveCreditCard(newCreditCard);

      const newSubscriptionData: DeepPartial<Subscription> = {
        user_id: userId,
        plan_id: planId,
        active: true,
        started_at: new Date()
      };

      await SubscriptionRepository.createSubscription(newSubscriptionData);

      res.status(200).send();
    } catch {
      res.status(500).send();
    }
  }
}
