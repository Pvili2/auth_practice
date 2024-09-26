import express from 'express';
import { loginController, logoutController, signupController, verifyEmailController, forgotPasswordController } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', signupController)
router.post('/verify-email', verifyEmailController)
router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/forgot-password', forgotPasswordController)

export default router;