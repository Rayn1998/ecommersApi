import express from 'express';
const router = express.Router();

// ====================
import { errors } from 'celebrate';

import users from './Rusers';
import goods from './Rgoods';
// ======================

router.use('/users', users);
router.use('/goods', goods);

router.use(errors());

// =====================
export default router;
