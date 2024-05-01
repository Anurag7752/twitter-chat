import mongoose from "mongoose";
import { type } from "os";

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: 'customer'},

}, {timestamps: true});


export default mongoose.model('user', userSchema, 'users');