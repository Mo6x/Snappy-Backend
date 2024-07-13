import express from "express";
import { login } from "../auths/authLogin";
import { register } from "../auths/authRegisteration";


const router = express.Router();

router.get('/test', (req,res)=>{res.status(200).json({message:"Server is running...."})});
router.post('/register', register);
router.post('/login', login);

export default router;
