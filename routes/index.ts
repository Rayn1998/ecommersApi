import express from 'express';
const router = express.Router();
import { celebrate } from 'celebrate';
// ====================
import { errors } from 'celebrate';

import { createUser } from '../controllers/Cusers';
import { createUserValidation, signInValidation } from '../utils/celebrateValidation';
import { signIn, signOut, checkAuth } from '../middlewares/auth';
import users from './Rusers';
import goods from './Rgoods';
// ======================

router.use('/sign-in', celebrate(signInValidation), signIn);
router.post('/sign-up', celebrate(createUserValidation), createUser);
router.post('/sign-out', signOut);

router.use('/users', checkAuth, users);
router.use('/goods', checkAuth, goods);

router.use(errors());

router.use('*', (req, res) => {
  res.status(400).send({ message: 'Page not found' });
});

// =====================
export default router;
