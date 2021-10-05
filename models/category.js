import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, index: true},
    postCount: { type: Number, default: 0 },
    productCount: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model('Category', CategorySchema);