import { Router } from 'express';
import bodyParser from 'body-parser';
import { CardPaymentController } from '../../controller/CardPaymentController';
import { CreditCardMiddleware } from '../../middlewares/creditCardMiddleware';

const router = Router();
router.use(bodyParser.json());

router.post(
  '/card-payment',
  CreditCardMiddleware.creditCardValidator,
  CreditCardMiddleware.checkIfAccessTokenIsValid,
  CardPaymentController.acceptCreditCardPayment
);

export default router;
