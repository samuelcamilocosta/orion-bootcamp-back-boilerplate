import { Request, Response } from 'express';
import { PlanCard } from '../entity/PlanCard';
import { MysqlDataSource } from '../config/database';
import { PlanCardRepository } from '../repositories/planCardRepository';

/**
 * Controller for exposing data in the soles endpoint, and also saving the data to the database.
 */
export class PlanCardController {
  /**
   * @swagger
   * /v1/plan-cards:
   *   get:
   *     summary: Exposes planCards data for frontend data consumption, after saving this data in the database.
   *     tags: [PlanCards]
   *     security:
   *       - bearerAuth: []
   *     description: Plan Card Title, description, image and button text
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: JSON with plan cards data shown successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 planCard:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: number
   *                     planCardTitle:
   *                       type: string
   *                     planCardDescription:
   *                       type: string
   *                     planCardImage:
   *                       type: string
   *                     planCardButtonText:
   *                       type: string
   *       400:
   *         description: Error when trying to get plan cards
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async getPlanCards(req: Request, res: Response): Promise<void> {
    try {
      const allPlanCards: PlanCard[] = await PlanCardRepository.getAllPlanCards();

      res.status(200).json(allPlanCards);
    } catch {
      res.status(400).json({ error: 'Erro ao buscar cartões de planos' });
    }
  }

  /**
   * @swagger
   * /v1/new-plan-card:
   *   post:
   *     summary: Allows for the creation of a new Plan Card
   *     tags: [PlanCards]
   *     security:
   *       - bearerAuth: []
   *     description: Plan Card Title, description, image and button text
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
   *               planCardTitle:
   *                 type: string
   *                 example: Título do novo card exemplo
   *               planCardDescription:
   *                 type: string
   *                 example: Descrição do card exemplo
   *               planCardImage:
   *                 type: string
   *                 example: Endereço da imagem exemplo
   *               planCardButtonText:
   *                 type: string
   *                 example: Texto do botão exemplo
   *     responses:
   *       201:
   *         description: JSON with plan cards data creates new Plan Card successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 planCard:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: number
   *                     planCardTitle:
   *                       type: string
   *                     planCardDescription:
   *                       type: string
   *                     planCardImage:
   *                       type: string
   *                     planCardButtonText:
   *                       type: string
   *       500:
   *         description: Error when trying to post a new plan card
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async createPlanCard(req: Request, res: Response): Promise<void> {
    const { planCardTitle, planCardDescription, planCardImage, planCardButtonText } = req.body;
    try {
      const newPlanCard: PlanCard = new PlanCard();
      newPlanCard.planCardTitle = planCardTitle;
      newPlanCard.planCardDescription = planCardDescription;
      newPlanCard.planCardImage = planCardImage;
      newPlanCard.planCardButtonText = planCardButtonText;

      await MysqlDataSource.getRepository(PlanCard).save(newPlanCard);

      res.status(201).json(newPlanCard);
    } catch (error) {
      res.status(500).json({ error: 'Não foi possível salvar o novo PlanCard' });
    }
  }
}
