import express from 'express';
import { TestPrismaCreation, CreateFile, GetAllFiles } from "../controller/Test";

const router = express.Router();

// POST /api/test/create
router.post('/create', TestPrismaCreation);

// POST /api/file/create
router.post("/file/create", CreateFile);

// GET /api/files
router.get('/files', GetAllFiles)


export default router;