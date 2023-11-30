import { Router } from 'express';
import bodyParser from 'body-parser';
import { PlanController } from './../../controller/PlanController';
import { AuthMiddleware } from '../../middlewares/authValidation';
import { PlanMiddleware } from '../../middlewares/planPostValidation';

const router = Router();
router.use(bodyParser.json());

router.get('/plans', AuthMiddleware.authValidation, PlanController.getAllPlans);
router.get('/plans/:id', AuthMiddleware.authValidation, PlanController.getPlanById);
router.post('/plans', AuthMiddleware.authValidation, PlanMiddleware.validatePlan(), PlanController.createPlan);
router.delete('/plans/:id', AuthMiddleware.authValidation, PlanController.deletePlanById);

export default router;
