import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../entity/Users';
import { DeepPartial } from 'typeorm';
import { NodemailerService } from '../library/nodemailerUtils';
import { JwtUtils } from '../library/jwtUtils';
import { MysqlDataSource } from '../config/database';
import { BcryptUtils } from '../library/bcryptUtils';

/**
 * Controller for allowing new users to be saved to the database.
 */
export class UserRegistrationController {
  /**
   * @swagger
   * /v1/user-registration:
   *   post:
   *     summary: Allows for the creation of a new User
   *     tags: [Users]
   *     description: User email and password
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
   *               email:
   *                 type: string
   *                 example: algumemail@servidor.com
   *               password:
   *                 type: string
   *                 example: senha#67@Maluca!
   *     responses:
   *       201:
   *         description: JSON with user data creates new user successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 User:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: number
   *                     email:
   *                       type: string
   *                     password:
   *                       type: string
   *       500:
   *         description: Error when trying to post a new User
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async userRegistration(req: Request, res: Response): Promise<void> {
    try {
      const { id, email, password } = req.body;

      const confirmationToken = await JwtUtils.generateJWTToken({ userId: id }, '24h');

      const newUser: DeepPartial<User> = {
        email,
        password
      };

      newUser.confirmationToken = confirmationToken;
      newUser.pendingConfirmation = true;

      const createdUser: User = await UserRepository.createUser(newUser);

      NodemailerService.sendUserRegistrationConfirmationEmail(email);

      const userData: DeepPartial<User> = {
        email: createdUser.email,
        confirmationToken: createdUser.confirmationToken,
        created_at: createdUser.created_at
      };

      res.status(201).json(userData);
    } catch {
      res.status(500).json({ error: 'Não foi possível salvar o usuário' });
    }
  }

  /**
   * @swagger
   * /v1/user-confirmation:
   *   post:
   *     summary: Confirm user registration with confirmation token
   *     tags: [Users]
   *     description: Confirm user registration using the confirmation token received via email.
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
   *               confirmationToken:
   *                 type: string
   *                 example: your_confirmation_token_here
   *     responses:
   *       200:
   *         description: User registration confirmed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: Registration confirmed successfully.
   *       400:
   *         description: Invalid confirmation token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Invalid confirmation token.
   *       500:
   *         description: Error when trying to confirm user registration
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Could not confirm user registration.
   */
  public static async confirmRegistration(req: Request, res: Response): Promise<Response> {
    try {
      const { confirmationToken } = req.body;

      const user = await UserRepository.findUserByConfirmationToken(confirmationToken);

      if (!user) {
        return res.status(400).json({ error: 'Token inválido' });
      }

      const confirmTokensMatch = await BcryptUtils.compareHashConfirmToken(confirmationToken, user.confirmationToken);

      if (!confirmTokensMatch) {
        return res.status(400).json({ error: 'Token inválido' });
      }

      user.pendingConfirmation = false;
      user.confirmationToken = null;

      await MysqlDataSource.getRepository(User).save(user);

      res.status(200).json({ message: 'Usuário confirmado com sucesso' });
    } catch {
      res.status(500).json({ error: 'Não foi possível confirmar o registro do usuário.' });
    }
  }
}
