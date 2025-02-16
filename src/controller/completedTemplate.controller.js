import { prisma } from "../config/db.js";

export const getAllCompletedTemplates = async (req, res) => {
  try {
    const completedTemplates = await prisma.completedTemplate.findMany({
      include: {
        template: true,
        admin: true,
        answers: true
      }
    });
    res.status(200).json(completedTemplates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching completed templates.", error: err.message });
  }
};

export const getCompletedTemplatesByTemplateId = async (req, res) => {
  try {
    const templateId = parseInt(req.params.templateId);
    const completedTemplates = await prisma.completedTemplate.findMany({
      where: {
        templateId: templateId
      },
      include: {
        template: true,
        admin: true,
        answers: true
      }
    });
    res.status(200).json(completedTemplates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching completed templates for the template.", error: err.message });
  }
};

export const createCompletedTemplate = async (req, res) => {
  try {
    const { templateId, adminId, answers } = req.body;
    const completedTemplate = await prisma.completedTemplate.create({
      data: {
        template: {
          connect: { id: templateId }
        },
        admin: {
          connect: { id: adminId }
        },
        answers: {
          create: answers.map(answer => ({
            answer: answer.answer,
            question: {
              connect: { id: answer.questionId }
            }
          }))
        }
      },
      include: {
        template: true,
        admin: true,
        answers: true
      }
    });
    res.status(201).json(completedTemplate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while creating the completed template.", error: err.message });
  }
};

export const getCompletedTemplateById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const completedTemplate = await prisma.completedTemplate.findUnique({
      where: { id },
      include: {
        template: true,
        admin: true,
        answers: true
      }
    });
    if (!completedTemplate) {
      return res.status(404).json({ message: "Completed template not found" });
    }
    res.status(200).json(completedTemplate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the completed template.", error: err.message });
  }
};

export const updateCompletedTemplate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updatedCompletedTemplate = await prisma.completedTemplate.update({
      where: { id },
      data,
      include: {
        template: true,
        admin: true,
        answers: true
      }
    });
    if (!updatedCompletedTemplate) {
      return res.status(404).json({ message: "Completed template not found" });
    }
    res.status(200).json(updatedCompletedTemplate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the completed template.", error: err.message });
  }
};

export const deleteCompletedTemplate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedCompletedTemplate = await prisma.completedTemplate.delete({
      where: { id }
    });
    res.status(200).json(deletedCompletedTemplate);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: "Completed template not found" });
    }
    res.status(500).json({ message: "An error occurred while deleting the completed template.", error: err.message });
  }
};