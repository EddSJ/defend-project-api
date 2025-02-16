import { Router } from "express";
import { authJwt } from "../middleware/authJwt.js"
import { 
  getAllTemplates, 
  getTemplatesByAdmin, 
  createTemplate, 
  getTemplateById, 
  updateTemplate,
  deleteTemplate,
  likeTemplate,
  unlikeTemplate,
  addCommentTotemplate,
  deleteCommentFromTemplate,
  getTemplateLikes,
  getTemplateComments
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

router.post('/templates/:id/like', [authJwt.verifyToken], async (req, res) => {
  await likeTemplate(req, res)
})

router.post('/templates/:id/unlike', [authJwt.verifyToken], async (req, res) => {
  await unlikeTemplate(req, res)
})

router.post('/templates/:id/comment', [authJwt.verifyToken], async (req, res) => {
  await addCommentTotemplate(req, res)
})

router.delete('/comments/:commentId', [authJwt.verifyToken], async (req, res) => {
  await deleteCommentFromTemplate(req, res)
})

router.get('/templates/:id/like', async (req, res) => {
  await getTemplateLikes(req, res)
})

router.get('/templates/:id/comment', async (req, res) => {
  await getTemplateComments(req, res)
})


export default router;