import mongoose from "mongoose";
import Category from "./category.js";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    id: { type: String, required: true, index: true},
    body: { type: String, required: true },
    //category: { type: CategorySchema, required: true }
}, {
    timestamps: true
});

export default mongoose.model('Post', PostSchema);