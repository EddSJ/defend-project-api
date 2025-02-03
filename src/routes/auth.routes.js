import { Router } from "express";
import { verifySignUp } from "../middleware/verifySignUp.js"
import { signup, signin } from "../controller/auth.controller.js";

const router = Router();

router.post('/auth/signup', 
  [
    verifySignUp.checkDuplicateUsernameOrEmail
  ], signup
)

router.post('/auth/signin', signin)

export default router;