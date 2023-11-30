import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

/**
 * Generates and verifies token for a given user
 */
export class JwtUtils {
  /**
   * generateJWTToken
   *
   * Generates jwt token, using 'jwt.sign' function. Static to allow to be called inside class itself.
   *
   * @param data instance of user to which the token will be assigned.
   * @param expiresIn Time taken until token expires.
   * @returns {Promise<string>} JWT token (string), returned from asynchronously from jwt api.
   */
  public static generateJWTToken(data: object, expiresIn: string): Promise<string> {
    return jwt.sign(data, secretKey, { expiresIn });
  }

  /**
   * verifyJWTToken
   *
   * Verifies a JWT token for authentication.
   *
   * @param token - The JWT token to be verified.
   * @returns An object representing the verified data or a JWT verification error.
   */
  public static verifyJWTToken(bearerToken: string): object | jwt.VerifyErrors {
    try {
      const token = bearerToken.split(' ')[1];
      return jwt.verify(token, secretKey);
    } catch (error) {
      return { error };
    }
  }

  /**
   * getUserIdFromToken
   *
   * Gets user id from a token.
   *
   * @param token - The JWT token to be verified.
   * @returns a number, if the id is found, or a string in the case of an error
   */
  public static getUserIdFromToken(token: string): number | null {
    const decodedToken = jwt.decode(token);

    if (decodedToken && 'id' in decodedToken) {
      const userIdString = decodedToken.id;
      const userId: number = Number(userIdString);

      if (!isNaN(userId)) {
        return userId;
      }
    }

    return null;
  }
}
