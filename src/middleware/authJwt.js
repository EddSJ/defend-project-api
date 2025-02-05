import jwt from 'jsonwebtoken'
import { config } from "../config/auth.config.js";
import { prisma } from "../config/db.js";


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  const token = authHeader.split(' ')[1]
  jwt.verify(token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
};

// isAdmin = (req, res, next) => {
//   const id = req.params.id
//   const admin = prisma.admin.findFirst({
//     where: {
//       id: parseInt
//     }
//   })
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Admin Role!"
//       });
//       return;
//     });
//   });
// };

export const authJwt = {
  verifyToken: verifyToken,
};