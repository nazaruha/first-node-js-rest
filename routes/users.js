import express from 'express';
import { getUsers, createUser, getUser, deleteUser, updateUser} from "../controllers/usersController.js";

const router = express.Router();

// all routes in here are starting with /users (look at the 11row index.js)
/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users list.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Get Users List Successfully.
 *       404:
 *         description: Users not found
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: user created successfully.
 *       500:
 *         description: error user create
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: the ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               firstName: "John"
 *               lastName: "Doe"
 *               age: 30
 *       400:
 *         description: User not found by ID.
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: the ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found by ID.
 */
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Create a new user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: the ID of the user to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       201:
 *         description: user created successfully.
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user by ID
 *     description: Use this endpoint to update an existing user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User has been updated
 *       400:
 *         description: Error user update
 */
router.patch("/:id", updateUser);

export default router;