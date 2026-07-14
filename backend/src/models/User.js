import mongoose from "mongoose";

const Schema = mongoose.Schema;
const addressSchema = new Schema({
    street: {type : String, required: true},
    city: {type : String, required: true},
    state: {type : String, required: true},
    country: {type : String, required: true},
    zipCode: {type : String, required: true},
    label: {type : String, default: "Home"},    
    notes: {type : String, default: ""}
}, {_id: true});

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
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
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    addresses: [addressSchema]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;