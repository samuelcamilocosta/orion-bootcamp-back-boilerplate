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

  /**
   * @swagger
   * /v1/plans:
   *   post:
   *     summary: Create a new plan
   *     tags: [Plans]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               type:
   *                 type: string
   *                 enum: [monthly, semesterly, annually]
   *               price:
   *                 type: number
   *               saves_percentage:
   *                 type: number
   *               description:
   *                 type: string
   *     responses:
   *       201:
   *         description: Plan successfully created
   *         content:
   *           application/json:
   *             schema:
   *              type: object
   *              properties:
   *                message:
   *                 type: string
   *       400:
   *        description: Invalid request body
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                 type: string
   */
  public static async createPlan(req: Request, res: Response): Promise<Response> {
    const { type, price, saves_percentage, description } = req.body;

    const newPlan = await PlanRepository.createPlan({ type, price, saves_percentage, description });

    return res.status(201).json(newPlan);
  }

  /**
   * @swagger
   * /v1/plans/{id}:
   *   delete:
   *     summary: Delete a plan by ID
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
   *         description: Plan successfully deleted
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
  public static async deletePlanById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleted = await PlanRepository.deletePlanById(Number(id));

    if (!deleted) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    return res.status(200).json({ message: 'Plano excluído com sucesso' });
  }
}
