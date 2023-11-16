import { Router } from 'express';
import bodyParser from 'body-parser';
import { UserRegistrationController } from '../../controller/UserRegistrationController';

const router = Router();
router.use(bodyParser.json());

router.post('/user-registration', UserRegistrationController.userRegistraton);

export default router;
