"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Mongoose (Nodejs ORM) User object schema
const userSchema = new mongoose_1.Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    documentId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        min: 13,
        unique: true
    },
    username: {
        type: String,
        required: true,
        min: 4
    },
    password: {
        type: String,
        required: true,
        min: 8
    }
});
exports.default = (0, mongoose_1.model)("User", userSchema);
