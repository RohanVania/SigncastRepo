import express from 'express';
import { TestPrismaCreation, CreateFile, GetAllFiles, FetchFileById } from "../controller/Test";

const router = express.Router();

// POST /api/test/create
router.post('/create', TestPrismaCreation);

// POST /api/file/create
router.post("/file/create", CreateFile);

// GET /api/files
router.get('/files', GetAllFiles)

// Fetch Particular File /api/file/id
router.get('/file/:id',FetchFileById)


export default router;