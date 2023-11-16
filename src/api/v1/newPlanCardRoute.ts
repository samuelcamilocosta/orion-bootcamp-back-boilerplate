import { Router } from 'express';
import bodyParser from 'body-parser';
import { PlanCardController } from '../../controller/PlanCardController';

const router = Router();
router.use(bodyParser.json());

router.post('/new-plan-card', PlanCardController.createPlanCard);

export default router;
