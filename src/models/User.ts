import { Schema, model } from "mongoose";
import IUser from "./IUser";

// Mongoose (Nodejs ORM) User object schema
const userSchema = new Schema<IUser>(
    {
        lastname: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        documentId:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            min: 13,
            unique: true
        },
        username:{
            type: String,
            required: true,
            min: 4
        },
        password:{
            type: String,
            required: true,
            min: 8
        }
    }
);

export default model<IUser>("User", userSchema);