import { Router } from "express";
import { authJwt } from "../middleware/authJwt.js"
import { 
  getAdmins, 
  createAdmin, 
  getAdmin, 
  deleteAdmin, 
  deleteAdmins, 
  updateAdmin, 
  blockAdmins, 
  unblockAdmins
} from "../controller/admin.controller.js";

const router = Router();

router.get('/admins', [authJwt.verifyToken], async (req, res) => {
  await getAdmins(req, res)
})

router.post('/admins', async (req, res) => {
  await createAdmin(req, res)
})

router.get('/admin/:id', [authJwt.verifyToken], async (req, res) => {
  await getAdmin(req, res)
})

router.delete('/admin/:id', [authJwt.verifyToken], async (req, res) => {
  await deleteAdmin(req, res)
})

router.put('/admin/:id', [authJwt.verifyToken], async (req, res) => {
  await updateAdmin(req, res)
})

router.post('/admin/block', [authJwt.verifyToken], async (req, res) => {
  await blockAdmins(req, res)
})

router.post('/admin/unblock', [authJwt.verifyToken], async (req, res) => {
  await unblockAdmins(req, res)
})

router.post('/admins/delete', [authJwt.verifyToken], async (req, res) => {
  await deleteAdmins(req, res)
})

export default router;