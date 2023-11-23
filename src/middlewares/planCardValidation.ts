import { NextFunction, Request, Response } from 'express';

export class PlanCardValidation {
  /**
   * validateCreatePlanCard
   *
   * Middleware for validating the request body for creating a new Plan Card.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next middleware function.
   */
  public static async validateCreatePlanCard(req: Request, res: Response, next: NextFunction): Promise<void> {
    const validationRules: { [key: string]: string } = {
      planCardTitle: 'Título',
      planCardDescription: 'Descrição',
      planCardImage: 'Imagem',
      planCardButtonText: 'Texto do botão'
    };

    for (const field in validationRules) {
      if (!req.body[field] || req.body[field] === '') {
        res.status(400).json({ error: `${validationRules[field]} ausente` });
        return;
      }
    }

    next();
  }
}
