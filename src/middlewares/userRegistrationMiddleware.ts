import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { UserValidationsMiddleware } from './validationMiddleware';

export class UserRegistrationValidations {
  public static checkEmailAndPasswordFormats(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const emailOrPasswordInvalid: boolean = UserValidationsMiddleware.validateEmailAndPassword(email, password);

    if (emailOrPasswordInvalid) {
      res.status(400).json({ error: 'Email e/ou senha inválidos' });
      return;
    }
    next();
  }

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
