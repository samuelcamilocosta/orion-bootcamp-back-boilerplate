import { Request, Response } from 'express';
import { PlanRepository } from '../repositories/planRepository';

/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: API endpoints for managing plans
 */
export class PlanController {
  /**
   * @swagger
   * /v1/plans:
   *   get:
   *     summary: Get all plans
   *     tags: [Plans]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Returns all plans
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   */
  public static async getAllPlans(_req: Request, res: Response): Promise<Response> {
    const plans = await PlanRepository.getPlans();

    return res.status(200).json(plans);
  }

  /**
   * @swagger
   * /v1/plans/{id}:
   *   get:
   *     summary: Get a plan by ID
   *     tags: [Plans]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the plan
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns the plan by ID
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Plan not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async getPlanById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const plan = await PlanRepository.getPlanById(Number(id));

    if (!plan) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    return res.status(200).json(plan);
  }
}
