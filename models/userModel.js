import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please, enter a user's first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please, enter a user's last name"]
    },
    age: {
        type: Number,
        require: [true, "Please, enter a user's age"],
        default: 0
    }
}, { timestamps: true /* auto assign values to this properties*/});

const User = mongoose.model('user', userSchema);

export default User;