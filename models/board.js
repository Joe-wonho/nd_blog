const mongoose = require("mongoose");
const { Schema } = mongoose;
const boardSchema = new Schema({
    boardId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    post_pw: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        unique: true
    },
    contents: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Boards", boardSchema);