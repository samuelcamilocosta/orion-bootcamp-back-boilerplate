import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import loginRoute from './api/v1/loginRoute';
import recoveryRoute from './api/v1/recoveryRoute';
import solesRoute from './api/v1/solesRoute';
import logoutRoute from './api/v1/logoutRoute';
import quotesRoute from './api/v1/quotesRoute';
import planCardsRoute from './api/v1/planCardsRoute';
import newPlanCardRoute from './api/v1/newPlanCardRoute';
import homePageCardsRoute from './api/v1/HomePageCardsRoute';
import userRegistrationRoute from './api/v1/userRegistrationRoute';
import resetPasswordRoute from './api/v1/resetPasswordRoute';
import userConfirmationRoute from './api/v1/userConfirmationRoute';
import plansRoute from './api/v1/plansRoute';
import creditCardPaymentRoute from './api/v1/CardPaymentRoute';

const router = Router();
/**
 * POST route for credit card payments
 *
 * @route POST /user-registration
 * @group Authentication
 */
router.use('/v1', creditCardPaymentRoute);

/**
 * POST route for user registration
 * Logic on controller/UserRegistrationController.ts
 *
 * @route POST /card-payment
 * @group Payment
 */
router.use('/v1', userRegistrationRoute);

/**
 * POST route for user confirmations after registration
 *
 * @route POST /user-confirmation
 * @group Users
 */
router.use('/v1', userConfirmationRoute);

/**
 * POST route for user login (authentication)
 * Logic on controller/LoginController.ts
 *
 * @route POST /login
 * @group Authentication
 */
router.use('/v1', loginRoute);

/**
 * POST route for password recovery
 *
 * @route POST /login
 * @group Authentication
 */

router.use('/v1', recoveryRoute);

/**
 * GET route for soles data
 *
 * @route GET /soles
 * @group Soles data
 */
router.use('/v1', solesRoute);

/**
 * GET route for PlanCards data
 *
 * @route GET /plan-cards
 * @group plan cards data
 */
router.use('/v1', planCardsRoute);

/**
 * POST route for creating a new PlanCard data
 *
 * @route POST /new-plan-card
 * @group plan cards data
 */
router.use('/v1', newPlanCardRoute);

/**
 * PATCH route for logout
 *
 * @route PATCH /logout
 * @group Logout
 */
router.use('/v1', logoutRoute);

/**
 * GET route for home page cards
 *
 * @route GET /get-home-page-cards
 * @route POST /v1/create-home-page-card
 * @group Home Page Cards
 */
router.use('/v1', homePageCardsRoute);

/**
 * GET route for quotes
 *
 * @route GET /quotes
 * @group Quotes
 */
router.use('/v1', quotesRoute);

/**
 * Routes for plans
 *
 * @route GET /plans
 * @route GET /plans/:id
 * @route POST /plans
 * @route DELETE /plans/:id
 * @group Plans
 */
router.use('/v1', plansRoute);

/**
 * GET route for home
 *
 * @route GET /
 * @group Default
 */

/**
 * POST route for password recovery
 *
 * @route POST /reset
 * @group Authentication
 */
router.use('/v1', resetPasswordRoute);

router.get('/', new HomeController().hello);

export default router;
