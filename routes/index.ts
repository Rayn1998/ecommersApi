import express from 'express';
const router = express.Router();

// ====================
import { errors } from 'celebrate';

import { signIn, signOut, checkAuth } from '../middlewares/auth';
import users from './Rusers';
import goods from './Rgoods';
// ======================

router.use('/sign-in', signIn);
router.use('/test', checkAuth);
router.post('/sign-out', signOut);

router.use('/users', checkAuth, users);
router.use('/goods', checkAuth, goods);

router.use(errors());

// =====================
export default router;
