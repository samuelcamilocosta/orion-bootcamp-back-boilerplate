import { Request, Response } from 'express';
import { UserValidationsMiddleware } from '../middlewares/validationMiddleware';
import { UserRepository } from '../repositories/userRepository';
import { BcryptUtils } from '../library/bcryptUtils';
import { JwtUtils } from '../library/jwtUtils';

/**
 * 1 - Gets user's email and password from request body
 * 2 - Finds user by email
 * 3 - Generates access token
 */
export class LoginController {
  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           format: int64
   *           description: Autogenerated ID
   *         email:
   *           type: string
   *           description: Unique email
   *         password:
   *           type: string
   *           description: Strong password (8 chars, min 1 uppercase, lowercase, number, special char)
   *       required:
   *         - email
   *         - password
   *       example:
   *         id: 1
   *         email: user1@test.com
   *         password: Pa$$$word123
   */

  /**
   * @swagger
   * /v1/login:
   *   post:
   *     summary: Route used for users to attempt authentication in the app. The function
   *       is set as static to allow calling it directly from the class, without the need to
   *       instantiate the class, not needing to instantiate.
   *     tags: [Login]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: user1@test.com
   *               password:
   *                 type: string
   *                 example: Pa$$$word123
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *       400:
   *         description: Invalid email and/or password
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public static async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const validationFails = UserValidationsMiddleware.validateEmailAndPassword(email, password);

    if (validationFails) {
      return res.status(400).json({ message: 'E-mail e/ou senha inválidos' });
    }

    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      return res.status(400).send('E-mail e/ou senha inválidos');
    }

    const passwordsMatch = await BcryptUtils.comparePassword(password, user.password);
    if (!passwordsMatch) {
      return res.status(400).send('E-mail e/ou senha inválidos');
    }

    const accessToken: string = await JwtUtils.generateJWTToken({ id: user.id }, '5h');

    await UserRepository.saveAccessTokenInUser(user.id, accessToken);

    const newUser = { ...user, password: undefined, accessToken };

    return res.json({ user: newUser });
  }
}
