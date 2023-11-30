import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { UserRepository } from '../repositories/userRepository';
import { UserValidationsMiddleware } from './validationMiddleware';

const verifyAsync = promisify(jwt.verify);
const secretKey = process.env.JWT_SECRET;

interface RequestWithUserId extends Request {
  id?: string;
}

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
   * Checks if user id (from request) equals the id from decoded confirmation token
   *
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next middleware function in the stack.
   */
  public static async checkIfConfirmationTokenIsValid(req: RequestWithUserId, res: Response, next: NextFunction): Promise<void> {
    const confirmationToken: string | undefined = req.headers['authorization'];

    if (confirmationToken && confirmationToken.startsWith('Bearer ')) {
      const token: string = confirmationToken.substring(7);

      try {
        const decoded = await verifyAsync(token, secretKey);
        req.id = decoded.id;
        next();
      } catch (err) {
        res.status(401).end();
      }
    } else {
      res.status(401).end();
    }
  }
}
