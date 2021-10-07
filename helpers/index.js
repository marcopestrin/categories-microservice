import productSchema from "../models/product.js";

export const getCountByCategory = async(category) => {
    return await productSchema.find({ category }).count();
}