import { Router } from 'express';
import bodyParser from 'body-parser';
import { UserRegistrationController } from '../../controller/UserRegistrationController';
import { UserRegistrationValidations } from '../../middlewares/userRegistrationMiddleware';

const router = Router();
router.use(bodyParser.json());

router.post(
  '/user-confirmation',
  UserRegistrationValidations.checkIfConfirmationTokenIsValid,
  UserRegistrationController.confirmRegistration
);

export default router;
