import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticateUser } from '../../../helpers/authentication.js';
import getAppAction from '../../../controllers/api/v1/apps/get-app.js';
import getAppsAction from '../../../controllers/api/v1/apps/get-apps.js';
import getAuthAction from '../../../controllers/api/v1/apps/get-auth.js';
import getTriggersAction from '../../../controllers/api/v1/apps/get-triggers.js';
import getTriggerSubstepsAction from '../../../controllers/api/v1/apps/get-trigger-substeps.js';
import getActionsAction from '../../../controllers/api/v1/apps/get-actions.js';
import getActionSubstepsAction from '../../../controllers/api/v1/apps/get-action-substeps.js';

const router = Router();

router.get('/', authenticateUser, asyncHandler(getAppsAction));
router.get('/:appKey', authenticateUser, asyncHandler(getAppAction));
router.get('/:appKey/auth', authenticateUser, asyncHandler(getAuthAction));

router.get(
  '/:appKey/triggers',
  authenticateUser,
  asyncHandler(getTriggersAction)
);

router.get(
  '/:appKey/triggers/:triggerKey/substeps',
  authenticateUser,
  asyncHandler(getTriggerSubstepsAction)
);

router.get(
  '/:appKey/actions',
  authenticateUser,
  asyncHandler(getActionsAction)
);

router.get(
  '/:appKey/actions/:actionKey/substeps',
  authenticateUser,
  asyncHandler(getActionSubstepsAction)
);

export default router;
