import { prisma } from "../config/db.js";

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      include: {
        admin: true,
        questions: true
      }
    });
    res.status(200).json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching templates.", error: err.message });
  }
};

export const getTemplatesByAdmin = async (req, res) => {
  try {
    const adminId = parseInt(req.params.adminId);
    const templates = await prisma.template.findMany({
      where: {
        adminId: adminId
      },
      include: {
        admin: true,
        questions: true
      }
    });
    res.status(200).json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching templates for the admin.", error: err.message });
  }
};

export const createTemplate = async (req, res) => {
  try {
    const { name, description, adminId, questions, isPublic } = req.body;
    const template = await prisma.template.create({
      data: {
        name,
        description,
        admin: {
          connect: { id: adminId }
        },
        isPublic,
        questions: {
          create: questions.map(question => ({
            question: question.text,
            type: question.type
          }))
        }
      },
      include: {
        questions: true
      }
    });
    res.status(201).json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while creating the template.", error: err.message });
  }
}

export const getTemplateById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const template = await prisma.template.findUnique({
      where: { id },
      include: {
        admin: true,
        questions: true
      }
    });
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the template.", error: err.message });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updatedTemplate = await prisma.template.update({
      where: { id },
      data,
      include: {
        admin: true,
        questions: true
      }
    });
    if (!updatedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json(updatedTemplate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the template.", error: err.message });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTemplate = await prisma.template.delete({
      where: { id }
    });
    res.status(200).json(deletedTemplate);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(500).json({ message: "An error occurred while deleting the template.", error: err.message });
  }
};