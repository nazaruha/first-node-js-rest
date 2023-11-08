import express from 'express';

const router = express.Router();

const users = [
    {
        "firstName": "Paul",
        "lastName": "Doe",
        "age": 23
    },
    {
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
    console.log("/users post method");
    res.send("GOOD");
})

export default router;