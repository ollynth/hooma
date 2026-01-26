import mongoose from "mongoose";

const Schema = mongoose.Schema;
const addressSchema = new Schema({
    street: {type : String, required: true},
    city: {type : String, required: true},
    state: {type : String, required: true},
    zipCode: {type : String, required: true},
    country: {type : String, required: true},
    notes: {type : String, default: ""}
}, {_id: true});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required : true,
        unique: true,
        match: /.+\@.+\..+/
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    profile: {
        firstName: String,
        lastName: String,
        phoneNumber: String
    },
    addresses: [addressSchema]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;