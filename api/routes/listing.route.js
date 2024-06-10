import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: path.resolve(__dirname, '../public/images') });
const router = express.Router();
router.post('/create', upload.array('images', 6), verifyToken, createListing);

export default router