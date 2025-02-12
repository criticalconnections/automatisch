import { Router } from 'express';
import graphQLInstance from '../helpers/graphql-instance.js';
import webhooksRouter from './webhooks.js';
import paddleRouter from './paddle.ee.js';
import healthcheckRouter from './healthcheck.js';
import automatischRouter from './api/v1/automatisch.js';
import usersRouter from './api/v1/users.js';
import paymentRouter from './api/v1/payment.ee.js';
import appAuthClientsRouter from './api/v1/app-auth-clients.js';
import flowsRouter from './api/v1/flows.js';
import appsRouter from './api/v1/apps.js';
import samlAuthProvidersRouter from './api/v1/admin/saml-auth-providers.ee.js';
import rolesRouter from './api/v1/admin/roles.ee.js';
import permissionsRouter from './api/v1/admin/permissions.ee.js';
import adminUsersRouter from './api/v1/admin/users.ee.js';
import adminAppAuthClientsRouter from './api/v1/admin/app-auth-clients.js';

const router = Router();

router.use('/graphql', graphQLInstance);
router.use('/webhooks', webhooksRouter);
router.use('/paddle', paddleRouter);
router.use('/healthcheck', healthcheckRouter);
router.use('/api/v1/automatisch', automatischRouter);
router.use('/api/v1/users', usersRouter);
router.use('/api/v1/payment', paymentRouter);
router.use('/api/v1/app-auth-clients', appAuthClientsRouter);
router.use('/api/v1/flows', flowsRouter);
router.use('/api/v1/apps', appsRouter);
router.use('/api/v1/admin/saml-auth-providers', samlAuthProvidersRouter);
router.use('/api/v1/admin/roles', rolesRouter);
router.use('/api/v1/admin/permissions', permissionsRouter);
router.use('/api/v1/admin/users', adminUsersRouter);
router.use('/api/v1/admin/app-auth-clients', adminAppAuthClientsRouter);

export default router;
