import {
    getCategories,
    getCategoryById,
    addCategory,
    deleteCategory
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

    router.get("/getProductById/:id", getProductById);
    router.get("/getPostById/:id", getPostById);
    router.get("/getCategoryById/:id", getCategoryById);

    router.put("/addPost", addPost);
    router.put("/addCategory", addCategory);
    router.put("/addProduct", addProduct);

    router.post("/editPost/:id", editPost);
    router.post("/editProduct/:id", editProduct);

    router.delete("/deleteCategory/:id", deleteCategory);
    router.delete("/deletePost/:id", deletePost);
    router.delete("/deleteProduct/:id", deleteProduct);
}