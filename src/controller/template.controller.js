import { prisma } from "../config/db.js";

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await prisma.template.findMany({
      include: {
        admin: true,
        questions: true,
        likedBy: true,
        comments: true
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
        likes: 0,
        questions: {
          create: questions.map(question => ({
            question: question.text,
            type: question.type,
            options: question.options ? question.options : []
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
    const { name, description, isPublic, questions, adminId } = req.body;
    const data = {
      name,
      description,
      isPublic,
      adminId,
      questions: {
        deleteMany: {
          id: {
            notIn: questions.map((q) => q.id).filter((id) => id),
          },
        },
        upsert: questions.map((q) => ({
          where: { id: q.id || -1 },
          update: {
            question: q.question,
            type: q.type,
            options: q.options,
          },
          create: {
            question: q.question,
            type: q.type,
            options: q.options,
          },
        })),
      },
    };

    const updatedTemplate = await prisma.template.update({
      where: { id },
      data,
      include: {
        admin: true,
        questions: true,
      },
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

export const likeTemplate = async (req, res) => {
  try {
    const templateId = parseInt(req.params.id);
    const { userId } = req.body;

    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: { likedBy: true }
    });
    const hasLiked = template.likedBy.some(user => user.id === userId);
    if (hasLiked) {
      return res.status(400).json({ message: "Ya has dado like a este template." });
    }
    const updatedTemplate = await prisma.template.update({
      where: { id: templateId },
      data: {
        likes: {
          increment: 1
        },
        likedBy: {
          connect: { id: userId }
        }
      },
      include: {
        likedBy: true
      }
    });
    res.status(200).json(updatedTemplate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while liking the template.", error: err.message });
  }
};

export const addCommentTotemplate = async (req, res) => {
  try {
    const templateId = parseInt(req.params.id);
    const { content, authorId } = req.body;

    if (!content || !authorId) {
      return res.status(400).json({ message: "Content and authorId are required" });
    }
    const comment = await prisma.comment.create({
      data: {
        content,
        template: {
          connect: { id: templateId }
        },
        author: {
          connect: { id: authorId }
        }
      },
      include: {
        author: true
      }
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while adding the comment.", error: err.message });
  }
};

export const getTemplateComments = async (req, res) => {
  try {
    const templateId = parseInt(req.params.id);
    const comments = await prisma.comment.findMany({
      where: { templateId },
      include: {
        author: true
      }
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the comments.", error: err.message });
  }
};

export const getTemplateLikes = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const template = await prisma.template.findUnique({
      where: { id },
      select: {
        likes: true
      }
    });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json({ likes: template.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the template likes.", error: err.message });
  }
};

export const deleteCommentFromTemplate = async (req, res) => {
  try {
    const commentId = parseInt(req.params.commentId);
    const deletedComment = await prisma.comment.delete({
      where: { id: commentId }
    });

    res.status(200).json(deletedComment);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(500).json({ message: "An error occurred while deleting the comment.", error: err.message });
  }
};

export const unlikeTemplate = async (req, res) => {
  try {
    const templateId = parseInt(req.params.id);
    const { userId } = req.body;

    const template = await prisma.template.findUnique({
      where: { id: templateId },
      include: { likedBy: true }
    });

    const hasLiked = template.likedBy.some(user => user.id === userId);

    if (!hasLiked) {
      return res.status(400).json({ message: "No has dado like a este template." });
    }

    const updatedTemplate = await prisma.template.update({
      where: { id: templateId },
      data: {
        likes: {
          decrement: 1
        },
        likedBy: {
          disconnect: { id: userId }
        }
      },
      include: {
        likedBy: true
      }
    });

    res.status(200).json(updatedTemplate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while unliking the template.", error: err.message });
  }
};