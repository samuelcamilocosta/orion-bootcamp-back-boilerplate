import { Router } from 'express';
import bodyParser from 'body-parser';
import { UserRegistrationController } from '../../controller/UserRegistrationController';
import { UserRegistrationValidations } from '../../middlewares/userRegistrationMiddleware';

const router = Router();
router.use(bodyParser.json());

router.post(
  '/user-registration',
  UserRegistrationValidations.checkEmailAndPasswordFormats,
  UserRegistrationValidations.checkIfUserExists,
  UserRegistrationController.userRegistration
);

export default router;
