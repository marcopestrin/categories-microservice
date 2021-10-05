import {
    getCategories,
    getCategoryById,
    addCategory
} from "../controller/categoryController.js";
import {
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct
} from "../controller/productController.js";
import { 
    getPosts,
    getPostById,
    addPost,
    editPost,
    deletePost
} from "../controller/postController.js";

export default function initializeSwagger(router) {
    router.get("/getProducts", getProducts);
    router.get("/getPosts", getPosts);
    router.get("/getCategories", getCategories);

    router.get("/getProductById", getProductById);
    router.get("/getPostById", getPostById);
    router.get("/getCategoryById", getCategoryById);

    router.put("/addPost", addPost);
    router.put("/addCategory", addCategory);
    router.put("/addProduct", addProduct);

    router.post("/editPost", editPost);
    router.post("/editProduct", editProduct);

    router.delete("/deletePost", deletePost);
    router.delete("/deleteProduct", deleteProduct);
}