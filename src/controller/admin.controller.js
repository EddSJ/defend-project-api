import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";


export const getAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany();
    return res.json(admins);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while fetching admins.", error: err.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const adminCreated = await prisma.admin.create({
      data: {
        ...body,
        password: hashedPassword
      }
    });
    return res.status(201).json(adminCreated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while creating the admin.", error: err.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await prisma.admin.findFirst({
      where: {
        id: parseInt(id)
      }
    });
    if (!admin) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(admin);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while fetching the admin.", error: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAdmin = await prisma.admin.delete({
      where: {
        id: parseInt(id)
      }
    });
    return res.json(deletedAdmin);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(500).json({ message: "An error occurred while deleting the admin.", error: err.message });
  }
}

export const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedAdmin = await prisma.admin.update({
      where: {
        id: parseInt(id)
      },
      data: data
    });
    return res.json(updatedAdmin);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(500).json({ message: "An error occurred while updating the admin.", error: err.message });
  }
};

export const blockAdmins = async (req, res) => {
  try {
    const { adminIds } = req.body;
    if (!Array.isArray(adminIds) || adminIds.length === 0) {
      return res.status(400).json({ message: "Invalid arguments"});
    }

    await prisma.admin.updateMany({
      where: {
        id: {
          in: adminIds.map(id => parseInt(id))
        }
      },
      data: {
        isBlocked: true
      }
    });
    const updatedAdmins = await prisma.admin.findMany();

    return res.json(updatedAdmins);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while blocking admins.", error });
  }
}

export const unblockAdmins = async (req, res) => {
  try {
    const { adminIds } = req.body;
    if (!Array.isArray(adminIds) || adminIds.length === 0) {
      return res.status(400).json({ message: "Invalid arguments"});
    }

    await prisma.admin.updateMany({
      where: {
        id: {
          in: adminIds.map(id => parseInt(id))
        }
      },
      data: {
        isBlocked: false
      }
    });
    const updatedAdmins = await prisma.admin.findMany();
    return res.json(updatedAdmins);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while blocking admins.", error: error.message });
  }
}

export const deleteAdmins = async (req, res) => {
  try { 
    const { adminIds } = req.body;
    console.log(adminIds)
    console.log(req.body)
    console.log("body en delete api, ", req.body)
    if (!Array.isArray(adminIds) || adminIds.length === 0) {
      return res.status(400).json({ message: "Invalid adminIds array." });
    }
    await prisma.admin.deleteMany({
      where: {
        id: {
          in: adminIds.map(id => parseInt(id))
        }
      }
    });
    const updatedAdmins = await prisma.admin.findMany();
    return res.json(updatedAdmins);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while deleting admins.", error: err.message });
  }
};
