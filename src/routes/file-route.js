const { Router } = require("express");
const {
  singleUpload,
  multipleUpload,
} = require("../controllers/file-controller");
const { singleFileUpload, multipleFileUpload } = require("../middleware");
const upload = require("../config/multer");

//router object
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File upload APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         fieldname:
 *           type: string
 *           example: file
 *         originalname:
 *           type: string
 *           example: ZFlip6.jpg
 *         encoding:
 *           type: string
 *           example: 7bit
 *         mimetype:
 *           type: string
 *           example: image/jpeg
 *         filename:
 *           type: string
 *           example: file-1768381959525.jpg
 *         path:
 *           type: string
 *           example: uploads/file-1768381959525.jpg
 *         size:
 *           type: integer
 *           example: 67409
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-01-14T09:11:16.934Z
 *         _id:
 *           type: string
 *           example: 69675e07b8080822ca316f04
 *         __v:
 *           type: integer
 *           example: 0
 */

/**
 * @swagger
 * /api/v1/files/single-upload:
 *   post:
 *     summary: Upload a single file
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 *       400:
 *         description: Invalid file upload
 *       500:
 *         description: Server error
 */

router.post("/single-upload", upload.single("file"), singleUpload);

/**
 * @swagger
 * /api/v1/files/multiple-upload:
 *   post:
 *     summary: Upload multiple files
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 *       400:
 *         description: Invalid file upload
 *       500:
 *         description: Server error
 */

router.post("/multiple-upload", upload.array("files", 5), multipleUpload);

module.exports = router;
