import { Router } from "express";
import { authJwt } from "../middleware/authJwt.js"
import { 
  getAllTemplates, 
  getTemplatesByAdmin, 
  createTemplate, 
  getTemplateById, 
  updateTemplate,
  deleteTemplate 
} from "../controller/template.controller.js";

const router = Router();

router.get('/templates',  async (req, res) => {
  await getAllTemplates(req, res)
})

router.get('/templates/admin/:adminId', [authJwt.verifyToken], async (req, res) => {
  await getTemplatesByAdmin(req, res)
})

router.post('/templates', [authJwt.verifyToken], async (req, res) => {
  await createTemplate(req, res)
})

router.get('/templates/:id', async (req, res) => {
  await getTemplateById(req, res)
})

router.delete('/templates/:id', [authJwt.verifyToken], async (req, res) => {
  await deleteTemplate(req, res)
})

router.put('/templates/:id', [authJwt.verifyToken], async (req, res) => {
  await updateTemplate(req, res)
})



export default router;