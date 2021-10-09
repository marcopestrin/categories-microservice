import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, index: true},
    price: { type: Number, required: true },
    category: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model('Product', ProductSchema);