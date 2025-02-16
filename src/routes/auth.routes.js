import { Router } from "express";
import { verifySignUp } from "../middleware/verifySignUp.js"
import { signup, signin, validateToken } from "../controller/auth.controller.js";

const router = Router();

router.post('/auth/signup', 
  [
    verifySignUp.checkDuplicateUsernameOrEmail
  ], signup
)

router.post('/auth/signin', signin)

router.get('/auth/validate-token', validateToken);

export default router;