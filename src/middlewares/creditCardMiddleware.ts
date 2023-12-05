import { NextFunction, Request, Response } from 'express';
import cardValidator from 'card-validator';

export class CreditCardMiddleware {
  /**
   * creditCardValidator
   *
   * Middleware for validating the request body for credit card payments.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next middleware function.
   */
  public static async creditCardValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { cardNumber, cardHolderName, expirationDate, cvv } = req.body;

    if (!cardNumber) {
      res.status(400).json({ error: 'Número do cartão não fornecido' });
      return;
    }

    if (!CreditCardMiddleware.isValidCardNumber(cardNumber)) {
      res.status(400).json({ error: 'Número do cartão inválido' });
      return;
    }

    if (!CreditCardMiddleware.isValidcardHolderName(cardHolderName)) {
      res.status(400).json({ error: 'Nome do titular inválido' });
      return;
    }

    if (!CreditCardMiddleware.isValidcardExpirationDate(expirationDate)) {
      res.status(400).json({ error: 'Data de expiração inválida' });
      return;
    }

    if (!CreditCardMiddleware.isValidcardCvv(cvv)) {
      res.status(400).json({ error: 'Código cvv inválido' });
      return;
    }

    next();
  }

  /**
   * isValidCardNumber
   *
   * Validate card number using the card validator library
   *
   * @param cardNumber - Card number from request
   * @return boolean - Is the card number valid or not?
   */
  public static isValidCardNumber(cardNumber: string): boolean {
    const cardInfo = cardValidator.number(cardNumber);
    return cardInfo.isPotentiallyValid && cardInfo.isValid;
  }

  /**
   * isValidcardHolderName
   *
   * Validate card holder name using the card validator library
   *
   * @param cardHolderName - Card holder name from request
   * @return boolean - Is the card holder name valid or not?
   */
  public static isValidcardHolderName(cardHolderName: string): boolean {
    const cardInfo = cardValidator.cardholderName(cardHolderName);
    return cardInfo.isPotentiallyValid && cardInfo.isValid;
  }

  /**
   * isValidcardExpirationDate
   *
   * Validate card expiration date using the card validator library
   *
   * @param expirationDate - Card expiration date from request
   * @return boolean - Is the card expiration date valid or not?
   */
  public static isValidcardExpirationDate(expirationDate: string): boolean {
    const cardInfo = cardValidator.expirationDate(expirationDate);
    return cardInfo.isPotentiallyValid && cardInfo.isValid;
  }

  /**
   * isValidcardCvv
   *
   * Validate card cvv using the card validator library
   *
   * @param cvv - Card cvv from request
   * @return boolean - Is the card cvv valid or not?
   */
  public static isValidcardCvv(cvv: string): boolean {
    const cardInfo = cardValidator.cvv(cvv);
    return cardInfo.isPotentiallyValid && cardInfo.isValid;
  }
}
