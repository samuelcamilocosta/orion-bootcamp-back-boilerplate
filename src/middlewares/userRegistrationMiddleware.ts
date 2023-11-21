import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { UserValidationsMiddleware } from './validationMiddleware';

/**
 * Validations for user registration
 */
export class UserRegistrationValidations {
  /**
   * checkEmailAndPasswordFormats
   *
   * Checks email and password formats, through UserValidationsMiddleware class
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   */
  public static async checkEmailAndPasswordFormats(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    const emailOrPasswordInvalid = await UserValidationsMiddleware.validateEmailAndPassword(email, password);

    if (emailOrPasswordInvalid) {
      res.status(400).json({ error: 'Email e/ou senha inválidos' });
      return;
    }
    next();
  }

  /**
   * checkIfUserExists
   *
   * Checks if there is already a user registered with given email
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   */
  public static async checkIfUserExists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    const existingUser = await UserRepository.findUserByEmail(email);

    if (!existingUser) {
      next();
    } else {
      res.status(400).json({ error: 'Este email já está em uso!' });
    }
  }
}
