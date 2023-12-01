import { Router } from 'express';
import bodyParser from 'body-parser';
import { PlanController } from './../../controller/PlanController';
import { AuthMiddleware } from '../../middlewares/authValidation';

const router = Router();
router.use(bodyParser.json());

router.get('/plans', AuthMiddleware.authValidation, PlanController.getAllPlans);
router.get('/plans/:id', AuthMiddleware.authValidation, PlanController.getPlanById);

export default router;
