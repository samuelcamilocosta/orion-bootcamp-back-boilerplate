import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { NodemailerService } from '../library/nodemailerUtils';
import { JwtUtils } from '../library/jwtUtils';
import { UserValidationsMiddleware } from '../middlewares/validationMiddleware';

/**
 * Controller user password recovery. Returns status 200 if user is found or not. If
 * user is found, attaches possword recovery token to the user object and sends recovery email.
 */
export class RecoveryController {
  /**
   * @swagger
   * /v1/recovery:
   *   post:
   *     summary: Request password recovery for a user.
   *     tags: [Recovery]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       204:
   *         description: Password recovery request successful
   */
  public static async recovery(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return res.status(204).end();
    }

    const token = await UserRepository.addPasswordRecoveryToken(user, user.id);
    const recoveryLink = 'http://localhost:4200/recovery/home?token=${token}';

    NodemailerService.sendPasswordRecoveryEmail(user.email, recoveryLink);

    return res.status(204).end();
  }
  /**
   * @swagger
   * /v1/reset-password:
   *   post:
   *     summary: Reset password for a user.
   *     tags: [Recovery]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *               newPassword:
   *                 type: string
   *     responses:
   *       200:
   *         description: Password reset successful
   *       400:
   *         description: Invalid new password format or Invalid or expired token
   */
  public static async resetPassword(req: Request, res: Response): Promise<Response> {
    const { token, newPassword } = req.body;

    if (!UserValidationsMiddleware.validatePassword(newPassword)) {
      return res.status(400).json({ message: 'Invalid new password format' });
    }

    try {
      const { userId } = await JwtUtils.verifyJWTToken(token);

      await UserRepository.updatePassword(userId, newPassword);

      await UserRepository.deletePasswordRecoveryToken(userId);

      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
  }
}
