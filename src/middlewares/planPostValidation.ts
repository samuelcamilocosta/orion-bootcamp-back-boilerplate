import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export class PlanMiddleware {
  /**
   * Validates the plan data sent in the request body.
   * @returns {ValidationChain[]} Array of middleware functions for plan validation.
   */
  public static validatePlan() {
    return [
      body('type').notEmpty().isIn(['monthly', 'semesterly', 'annually']),
      body('price').notEmpty().isNumeric(),
      body('saves_percentage').optional().isNumeric(),
      body('description').optional().isString(),
      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ message: 'Todos os campos devem estar preenchidos corretamente' });
        }
        next();
      }
    ];
  }
}
