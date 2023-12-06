import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export class QuoteMiddleware {
  /**
   * Validates the quote data sent in the request body.
   * @returns {ValidationChain[]} Array of middleware functions for quote validation.
   */
  public static validateQuote() {
    return [
      body('author').notEmpty().isString(),
      body('quote').notEmpty().isString(),
      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ message: 'Os campos author e quote devem estar preenchidos com uma string' });
        }
        next();
      }
    ];
  }
}
