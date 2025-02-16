import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { prisma } from "../config/db.js";
import { config } from '../config/auth.config.js'

export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const admin = await prisma.admin.create({
      data: {
        ...req.body,
        password: hashedPassword
      }
    });
    res.status(201).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while creating the admin: ", err });
  }
};

export const signin = async (req, res) => {
  try {
    const admin = await prisma.admin.findFirst({
      where: {
        email: req.body.email
      }
    });

    if (!admin) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      admin.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: admin.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      }
    );

    res.status(200).json({
      admin,
      accessToken: token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while signing in.", error: err.message });
  }
}

export const validateToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    return res.status(200).send({
      message: "Token is valid!",
      userId: decoded.id
    });
  });
};