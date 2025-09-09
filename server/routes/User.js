import express from "express";
import {
  LoginUser,
  SignInUserWithGoogle,
  SignUpUser,
  verify_email_code,
} from "../controllers/User.js";
const router = express.Router();

router.post("/register", SignUpUser);
router.post("/verify-email", verify_email_code);
router.post("/login", LoginUser);
router.post("/google_login", SignInUserWithGoogle);

export default router;
