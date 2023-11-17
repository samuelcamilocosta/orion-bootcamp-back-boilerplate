import { Router } from 'express';
import bodyParser from 'body-parser';
import { PlanCardController } from '../../controller/PlanCardController';
import { AuthMiddleware } from '../../middlewares/authValidation';

const router = Router();
router.use(bodyParser.json());

router.get('/plan-cards', AuthMiddleware.authValidation, PlanCardController.getPlanCards);

export default router;
