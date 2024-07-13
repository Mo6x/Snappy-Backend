import express from "express";
import { getUsers } from "../controllers/getUsers";
import { deleteUser } from "../controllers/deleteUser";
import { protect } from '../middleware/jwt';
import { getUserProfile } from "../controllers/userProfile";
import { buyData, deleteTransactions, getAllTransactions } from "../controllers/transactions";


const router = express.Router();

router.get('/', protect, getUsers);
router.delete('/:id', protect, deleteUser);
router.get('/profile', protect, getUserProfile);
router.post('/data', protect, buyData);
router.get('/data', protect, getAllTransactions);
router.delete('/data/:id', protect, deleteTransactions);

export default router;
