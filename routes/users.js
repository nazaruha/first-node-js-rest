import express from 'express';
import { v4 as uuidv4 } from 'uuid'; // to crete unique IDs

const router = express.Router();

let users = [
    {
        "id": "1",
        "firstName": "Paul",
        "lastName": "Doe",
        "age": 23
    },
    {
        "id": "2",
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
    console.log(req.body);
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

    const findUser = users.find(x => x.id === id); // user contains id (string), firstName (string), lastName (string), age (number)
    if (findUser !== undefined) {
        res.status(200).send(findUser);
    } else {
        res.status(400).json({message: `User by ID: ${id} not found`});
    }
})

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
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const findUser = users.find(x => x.id === id); // user contains id (string), firstName (string), lastName (string), age (number)
    console.log(`findUser = ${findUser}`);
    if (findUser !== undefined) {
        users = users.filter(x => x.id !== id);
        res.status(200).send(`User by ID: ${id} has been deleted`);
    } else {
        res.status(400).json({message: `User by ID: ${id} not found`});
    }
})


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
router.put("/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find(x => x.id === id);
    const {firstName, lastName, age} = req.body;

    if (user !== undefined) {
        if (firstName !== undefined && firstName.trim().length > 0) user.firstName = firstName;
        if (lastName !== undefined && lastName.trim().length > 0) user.lastName = lastName;
        if (age !== undefined && age > -1) user.age = age;

        res.status(201).send(`User by ID: ${id} has been updated`);
    } else {
        res.status(400).send(`User by ID: ${id} not found`);
    }
})

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
router.patch("/:id", (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;

    const user = users.find(x => x.id === id);
    if (user !== undefined) {
        if (firstName !== undefined && firstName.trim().length > 0) user.firstName = firstName.trim();
        if (lastName !== undefined && lastName.trim().length > 0) user.lastName = lastName.trim();
        if (age !== undefined && age > -1) user.age = age;

        res.status(200).send(`User by ID: ${id} has been updated`);
    } else {
        res.status(400).send(`User by ID: ${id} not updated`);
    }
})

export default router;