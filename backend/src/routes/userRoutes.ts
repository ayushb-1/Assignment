import express from 'express';
import {getUsers, createUser, updateUser, deleteUser} from '../controllers/userController';

const router = express.Router();

router.get('/users', getUsers);
router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);

export default router;