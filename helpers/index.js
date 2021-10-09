import productSchema from "../models/product.js";
import postSchema from "../models/post.js";

export const getProductCountByCategory = async(category) => {
    return await productSchema.find({ category }).count();
}

export const getPostCountByCategory = async(category) => {
    return await postSchema.find({ category }).count();
}
