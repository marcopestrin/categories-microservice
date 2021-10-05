import mongoose from "mongoose";
import Category from "./category.js";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, index: true},
    price: { type: Number, required: true },
    //category: { type: Category, required: true }
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);