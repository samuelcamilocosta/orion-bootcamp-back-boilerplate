import { Router } from 'express';
import bodyParser from 'body-parser';
import { PlanCardController } from '../../controller/PlanCardController';
import { AuthMiddleware } from '../../middlewares/authValidation';
import { PlanCardValidation } from '../../middlewares/planCardValidation';

const router = Router();
router.use(bodyParser.json());

router.post(
  '/new-plan-card',
  [PlanCardValidation.validateCreatePlanCard, AuthMiddleware.authValidation],
  PlanCardController.createPlanCard
);

export default router;
