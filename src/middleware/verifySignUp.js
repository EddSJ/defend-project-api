import { prisma } from "../config/db.js";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {

  const user = await prisma.admin.findFirst({
    where: {
      email: req.body.email
    }
  })
  if (user) {
    res.status(400).json({
      error: "Failed! Email is already in use!"
    });
    return;
  }
  next();
};

export const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};