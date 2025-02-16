import { Router } from "express";
import { authJwt } from "../middleware/authJwt.js";
import {
  getAllCompletedTemplates,
  getCompletedTemplatesByTemplateId,
  createCompletedTemplate,
  getCompletedTemplateById,
  updateCompletedTemplate,
  deleteCompletedTemplate
} from "../controller/completedTemplate.controller.js";

const router = Router();

router.get('/completed-templates', async (req, res) => {
  await getAllCompletedTemplates(req, res);
});

router.get('/completed-templates/admin/:templateId', [authJwt.verifyToken], async (req, res) => {
  await getCompletedTemplatesByTemplateId(req, res);
});

router.post('/completed-templates',[authJwt.verifyToken] , async (req, res) => {
  await createCompletedTemplate(req, res);
});

router.get('/completed-templates/:id', async (req, res) => {
  await getCompletedTemplateById(req, res);
});

router.put('/completed-templates/:id', [authJwt.verifyToken], async (req, res) => {
  await updateCompletedTemplate(req, res);
});

router.delete('/completed-templates/:id', [authJwt.verifyToken], async (req, res) => {
  await deleteCompletedTemplate(req, res);
});

export default router;