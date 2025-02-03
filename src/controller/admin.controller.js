import { prisma } from "../config/db.js";

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
    const adminCreated = await prisma.admin.create({
      data: body
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