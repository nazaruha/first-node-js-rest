import {v4 as uuidv4} from "uuid"; // to create unique IDs
import User from "../models/userModel.js";

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

export const getUsers = async (req, res) => {
    // res.send(users);
    try {
        const users = await User.find().sort({createdAt: -1}); // sort by descending (from the newest to the oldest)
        res.status(200).send(users);
    } catch(err) {
        res.status(404).send(`Users not found: ${err}`);
    }
}

export const getUser = (req, res) => {
    const id = req.params.id; // /users/2 => req.params { id: 2 }

    // const findUser = users.find(x => x.id === id); // user contains id (string), firstName (string), lastName (string), age (number)
    // if (findUser !== undefined) {
    //     res.status(200).send(findUser);
    // } else {
    //     res.status(400).json({message: `User by ID: ${id} not found`});
    // }

    User.findById(id)
        .then(result => {
            res.status(200).send(result);
        }).catch(err => {
            res.status(400).send(`User by ID: ${id} not found: ${err}`);
        })
}
export const createUser = async (req, res) => {
    // const newUser = req.body;
    // users.push({ id: uuidv4(), ... newUser });
    // res.send("User Has been created");

    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch(err) {
        res.status(500).send("Error User Create: " + err);
    }
}

export const deleteUser = (req, res) => {
    const id = req.params.id;
    const findUser = users.find(x => x.id === id); // user contains id (string), firstName (string), lastName (string), age (number)
    console.log(`findUser = ${findUser}`);
    if (findUser !== undefined) {
        users = users.filter(x => x.id !== id);
        res.status(200).send(`User by ID: ${id} has been deleted`);
    } else {
        res.status(400).json({message: `User by ID: ${id} not found`});
    }
}

export const updateUser = (req, res) => {
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
}