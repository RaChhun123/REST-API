const { Router } = require("express");
const {
  signUp,
  logIn,
  showMe,
  exchahngeToken,
} = require("../controllers/auth-controller");
const { signUpSchema } = require("../common/validator");
const { handleValidation, verifyJWT } = require("../middleware");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 */

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               username:
 *                 type: string
 *                 example: test
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               confirmPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid credentials
 */

// SIGN UP USER || POST
router.post("/sign-up", signUpSchema, handleValidation, signUp);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login success
 *       400:
 *         description: Invalid credentials
 */

// lOGIN USER || POST
router.post("/login", logIn);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: show User identity
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User Identity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "6962aef831cd7dd0caa31ed6"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "nini@example.com"
 *                 username:
 *                   type: string
 *                   example: "nini"
 *                 iat:
 *                   type: integer
 *                   format: int64
 *                   example: 1768379104
 *                 exp:
 *                   type: integer
 *                   format: int64
 *                   example: 1768382704
 *       500:
 *         description: Some server error
 */

router.get("/me", verifyJWT, showMe);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: refresh success
 *       400:
 *         description: Invalid credentials
 */

router.post("/refresh", exchahngeToken);

module.exports = router;
