const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     description: Returns a hello message.
 *     tags:
 *       - Greetings
 *     responses:
 *       200:
 *         description: Successful response with a hello message.
 */
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the routes file!' });
});
/**
 * @swagger
 * /create:
 *   post:
 *     description: Create a new resource.
 *     tags:
 *       - Greetings
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Resource created successfully.
 */
router.post('/create', (req, res) => {
    const { name, description } = req.body;
    // Handle the creation of the resource here.
    // For this example, we'll simply echo back the input data.
    res.status(201).json({ name, description });
});

module.exports = router;
