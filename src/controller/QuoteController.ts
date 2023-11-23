import { Request, Response } from 'express';
import { QuoteRepository } from '../repositories/quoteRepository';

/**
 * @swagger
 * tags:
 *   name: Quotes
 *   description: API endpoints for managing quotes
 */
export class QuoteController {
  /**
   * @swagger
   * /v1/quotes:
   *   get:
   *     summary: Get all quotes
   *     tags: [Quotes]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Returns all quotes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   */
  public static async getAllQuotes(_req: Request, res: Response): Promise<Response> {
    const quotes = await QuoteRepository.getQuotes();

    return res.status(200).json(quotes);
  }

  /**
   * @swagger
   * /v1/quotes/{id}:
   *   get:
   *     summary: Get a quote by ID
   *     tags: [Quotes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the quote
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns the quote by ID
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Quote not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async getQuoteById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const quote = await QuoteRepository.getQuoteById(Number(id));

    if (!quote) {
      return res.status(404).json({ message: 'Citação não encontrada' });
    }

    return res.status(200).json(quote);
  }

  /**
   * @swagger
   * /v1/quotes/random:
   *   get:
   *     summary: Get random quotes
   *     tags: [Quotes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: count
   *         description: Number of random quotes to retrieve
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns an array of random quotes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   */
  public static async getRandomQuotes(req: Request, res: Response): Promise<Response> {
    const { count } = req.query;

    const quotes = await QuoteRepository.getRandomQuotes(Number(count));

    return res.status(200).json(quotes);
  }

  /**
   * @swagger
   * /v1/quotes/paginated:
   *   get:
   *     summary: Get paginated quotes
   *     tags: [Quotes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         description: Page number
   *         schema:
   *           type: integer
   *       - in: query
   *         name: limit
   *         description: Number of quotes per page
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns paginated quotes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   */
  public static async getPaginatedQuotes(req: Request, res: Response): Promise<Response> {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

    const quotes = await QuoteRepository.getQuotes(page, limit);

    return res.status(200).json(quotes);
  }

  /**
   * @swagger
   * /v1/quotes:
   *  post:
   *    summary: Save a new quote
   *    tags: [Quotes]
   *    security:
   *      - bearerAuth: []
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              author:
   *                type: string
   *                example: "Minha Mãe"
   *              quote:
   *                type: string
   *                example: "Você não é todo mundo!"
   *    responses:
   *      201:
   *        description: Returns the saved quote
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                author:
   *                  type: string
   *                quote:
   *                  type: string
   *                id:
   *                  type: number
   *                created_at:
   *                  type: string
   *      400:
   *        description: Invalid request body
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                 type: string
   */
  public static async saveQuote(req: Request, res: Response): Promise<Response> {
    const quote = req.body;

    const savedQuote = await QuoteRepository.saveQuote(quote);

    return res.status(201).json(savedQuote);
  }
}
