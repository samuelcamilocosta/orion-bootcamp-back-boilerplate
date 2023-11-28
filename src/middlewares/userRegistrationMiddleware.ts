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
  public static async checkEmailFormat(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    const emailValid = UserValidationsMiddleware.validateEmail(email);

    if (!emailValid) {
      res.status(400).json({ error: 'Email inválido' });
      return;
    }

    next();
  }

  /**
   * checkEmailAndPasswordFormats
   *
   * Checks email and password formats, through UserValidationsMiddleware class
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   */
  public static async checkPasswordFormat(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { password } = req.body;

    const passwordValid = UserValidationsMiddleware.validatePassword(password);

    if (!passwordValid) {
      res.status(400).json({ error: 'Senha inválida' });
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
      res.status(400).json({ error: 'E-mail já cadastrado' });
    }
  }

  /**
   * checkIfConfirmationTokenIsValid
   *
   * Checks if there is a user registered with this confirmation token
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   */
  public static async checkIfConfirmationTokenIsValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { confirmationToken } = req.body;

    const existingUser = await UserRepository.findUserByConfirmationToken(confirmationToken);

    if (existingUser) {
      next();
    } else {
      res.status(400).json({ error: 'Token de confirmação inválido' });
    }
  }
}
