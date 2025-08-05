import express from 'express';

import { getTotalUserCount, getAllClinics, getAllUsers, getLatestThreeUsers,upsertMainComponents,getMainComponents } from '../controllers/dashboard';

const router = express.Router();

// Route to get total user count
router.get('/total-users', getTotalUserCount);
// Route to get all clinics
router.get('/clinics', getAllClinics);
// Route to get all users
router.get('/users', getAllUsers);
// Route to get latest three users
router.get('/latest-users', getLatestThreeUsers);
// Route to upsert main components
router.post('/upsert-main-components', upsertMainComponents);
// Route to get main components
router.get('/main-components', getMainComponents);



export default router;
