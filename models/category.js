import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, index: true}
}, {
    timestamps: true
});

export default mongoose.model('Category', CategorySchema);