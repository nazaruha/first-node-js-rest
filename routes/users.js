import express from 'express';
import { v4 as uuidv4 } from 'uuid'; // to crete unique IDs

const router = express.Router();

const users = [
    {
        "id": uuidv4(),
        "firstName": "Paul",
        "lastName": "Doe",
        "age": 23
    },
    {
        "id": uuidv4(),
        "firstName": "Jane",
        "lastName": "Doe",
        "age": 18
    }
]

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
 */
router.get("/", (req, res) => {
    res.send(users);
})

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
 */
router.post("/", (req, res) => {
    const newUser = req.body;
    users.push({ id: uuidv4(), ... newUser });
    res.send("User Has been created");
})

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
router.get("/:id", (req, res) => {
    const id = req.params.id; // /users/2 => req.params { id: 2 }

    const findUser = users.find(x => x.id == id); // user contains id (string), firstName (string), lastName (string), age (number)
    if (findUser !== null) {
        res.status(200).send(findUser);
    } else {
        res.status(400).json({message: `User by ID: ${id} not found`});
    }
})

export default router;