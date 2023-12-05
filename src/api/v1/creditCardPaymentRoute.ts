import { Router } from 'express';
import bodyParser from 'body-parser';
import { CreditCardController } from '../../controller/CreditCardController';
import { CreditCardMiddleware } from '../../middlewares/creditCardMiddleware';

const router = Router();
router.use(bodyParser.json());

router.post('/card-payment', CreditCardMiddleware.creditCardValidator, CreditCardController.acceptCreditCardPayment);

export default router;
