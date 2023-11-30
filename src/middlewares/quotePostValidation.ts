import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export class QuoteMiddleware {
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
