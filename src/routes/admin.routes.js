import { Router } from "express";
import { authJwt } from "../middleware/authJwt.js"
import { getAdmins, createAdmin, getAdmin, deleteAdmin, updateAdmin } from "../controller/admin.controller.js";

const router = Router();

router.get('/admins', [authJwt.verifyToken], async (req, res) => {
  await getAdmins(req, res)
})

router.post('/admins', [authJwt.verifyToken], async (req, res) => {
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



export default router;