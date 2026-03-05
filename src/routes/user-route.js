const { Router } = require("express");
const {
  getUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");

//router object
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: Email of user
 *         files:
 *           type: array
 *           items:
 *             type: string
 *             description: Stored as picture id
 *           description: picture of user
 *       example:
 *         _id: 696001c68ba44bf6215a7410
 *         username: Example pile
 *         email: example@gmail.com
 *         isActive: true
 *         createdAt: 2026-01-08T19:10:30.657Z
 *         files: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PaginatedUsers:
 *       type: object
 *       properties:
 *         docs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         totalDocs:
 *           type: integer
 *           example: 0
 *         limit:
 *           type: integer
 *           example: 10
 *         totalPages:
 *           type: integer
 *           example: 1
 *         page:
 *           type: integer
 *           example: 5
 *         pagingCounter:
 *           type: integer
 *           example: 41
 *         hasPrevPage:
 *           type: boolean
 *           example: true
 *         hasNextPage:
 *           type: boolean
 *           example: false
 *         prevPage:
 *           type: integer
 *           nullable: true
 *           example: 4
 *         nextPage:
 *           type: integer
 *           nullable: true
 *           example: null
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get paginated users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *           example: '_id username email createdAt isActive files'
 *         description: Fields to select (space-separated)
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: '{"createdAt":"desc"}'
 *         description: Sort options (JSON string)
 *
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *           example: '{"username":"Francis Crooks","email":"anthony.carter74@gmail.com"}'
 *         description: MongoDB filter query (JSON string)
 *
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *           example: '{"path":"files","select":"path"}'
 *         description: Mongoose populate options (JSON string)
 *
 *     responses:
 *       200:
 *         description: Paginated user list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedUsers'
 */

// GET ALL STUDENTS LIST || GET
router.get("/", getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User was not found
 */

// GET STUDENT BY ID || GET
router.get("/:id", getUserbyId);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               required:
 *                 - username
 *                 - email
 *                 - files
 *               properties:
 *                 username:
 *                   type: string
 *                   example: test
 *                 email:
 *                   type: string
 *                   example: test@example.com
 *                 password:
 *                   type: string
 *                   example: password123
 *                 files:
 *                   type: array
 *                   items:
 *                     type: string
 *                     nullable: true
 *                   example:
 *                     - "696001978ba44bf6215a740b"
 *                     - "696209d355eedbef28afb5ca"
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

// CREATE STUDENT || POST
router.post("/", createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *    summary: Update user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: User was not found
 *      500:
 *        description: Some error happened
 */

// UPDATE STUDENT || PUT
router.put("/:id", updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Remove user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *
 *     responses:
 *       200:
 *         description: User was deleted
 *       404:
 *         description: User was not found
 */

// DELETE STUDENT || DELETE
router.delete("/:id", deleteUser);

module.exports = router;
