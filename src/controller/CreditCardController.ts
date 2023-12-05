import { Request, Response } from 'express';
import { DeepPartial } from 'typeorm';
import { CreditCard } from '../entity/CreditCard';
import { CreditCardRepository } from '../repositories/creditCardRepository';

/**
 * Controller for validating credit card data on payments
 */
export class CreditCardController {
  /**
   * @swagger
   * /v1/card-payment:
   *   post:
   *     summary: CreditCard
   *     tags: [Credit Card]
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
      const { cardNumber, cardHolderName, expirationDate, cvv } = req.body;

      const newCreditCard: DeepPartial<CreditCard> = {
        cardNumber,
        cardHolderName,
        expirationDate,
        cvv
      };

      await CreditCardRepository.saveCreditCard(newCreditCard);

      res.status(200).send();
    } catch {
      res.status(500).send();
    }
  }
}
