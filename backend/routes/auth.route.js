import express from 'express';
import { loginController, logoutController, signupController, verifyEmailController } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', signupController)
router.post('/verify-email', verifyEmailController)
router.post('/login', loginController)
router.post('/logout', logoutController)


export default router;